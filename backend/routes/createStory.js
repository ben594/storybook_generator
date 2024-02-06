const express = require('express');
const createStoryRoute = express.Router();
const { v4: uuidv4 } = require('uuid');
const { OpenAI } = require('openai');
const mongoose = require('mongoose');
const { User, Story } = require('../models/modelSchema');
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const axios = require('axios');

// openai config
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// azure config
const accountName = process.env.AZURE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_ACCOUNT_KEY;
const containerName = process.env.AZURE_CONTAINER_NAME;
const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);

// route: /create-story
createStoryRoute.get('/', (req, res) => {
    res.send('Welcome to the create story route!');
});

createStoryRoute.post('/', async (req, res) => {
    try {
        // create story document in the database
        // get user input from request
        const username = req.body.username;
        const age = req.body.age;
        const mainCharacter = req.body.mainCharacter;
        const setting = req.body.setting;
        const year = req.body.year;
        const userPrompt = req.body.prompt;

        // check user exists
        const user = await User.findOne({ username: username });
        if (user === null) {
            return res.status(500).send("Username does not exist");
        }

        // get output from chat gpt
        const chatResponse = await getChatResponse(age, mainCharacter, year, setting, userPrompt);

        console.log("chatResponse: ", chatResponse)

        // generate new story id
        const storyID = uuidv4();

        let hostedImageURLs = [];
        for (const text of chatResponse.parsedResponse.texts) {
            if (!text.toLowerCase().startsWith("option")) {
                let description = text;
                let imageURL = await getDalleResponse(description);
                let hostedImageURL = await getAndStoreImage(imageURL, storyID);
                hostedImageURLs.push(hostedImageURL);
            }
        }

        // add story to database
        const newStory = new Story({
            storyID: storyID,
            title: chatResponse.parsedResponse.title,
            texts: chatResponse.parsedResponse.texts,
            chatHistory: chatResponse.chatHistory,
            images: hostedImageURLs
        });
        const insertedStory = await newStory.save();

        // link story id to user in the database
        var userStories = user.storyIDs;
        userStories.push(storyID);
        user.storyIDs = userStories;
        await user.save();

        // return story object
        return res.status(201).json(insertedStory);
    } catch (err) {
        return res.status(500).send(err.stack);
    }
});

async function getChatResponse(age, mainCharacter, setting, year, userPrompt) {
    const keywords = `
    main character: ${mainCharacter},
    setting: ${setting},
    year: ${year},
    the story is about: ${userPrompt}
    `
    const chatPrompt = `
    You are an interactive story creator and you are going to create \
    an story for a ${age} year old kid based on the keywords. You are first going to give a title. \
    And then, you are going to write 3 paragraphs of the story and under 200 words in total. At the end, you will provide the reader with three options under 20 words \
    to let them choose how the story continues.
    
    
    Please use this format for giving options:
    Option 1: ...
    Option 2: ...
    Option 3: ...

    You should not remind the reader to choose how the story continues.

    Keywords:
    ${keywords}
    `;

    // get title and story
    const storyCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: chatPrompt }],
        model: "gpt-3.5-turbo",
    });
    const storyResponse = storyCompletion.choices[0].message.content;
    console.log("Received story response: ", storyResponse);


    // chathistory: [{role, content}]
    // parsedResponse: {texts: [String], title}

    return { chatHistory: [{ role: 'user', content: chatPrompt }, { role: 'assistant', content: storyResponse }], parsedResponse: parseResponse(storyResponse) };
}

async function getDalleResponse(description) {
    const prompt = `
    Create a text-free and scenic image using the style of Studio Ghibli of the following story: ${description}
    `;
    const image = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
    });
    console.log("Received image url: ", image.data[0].url);
    const imageURL = image.data[0].url;
    return imageURL;
}

async function getAndStoreImage(imageURL, storyID) {
    try {
        // get image from dalle image URL
        const imageResponse = await axios.get(imageURL, { responseType: 'arraybuffer' });
        if (imageResponse.status !== 200) {
            console.error('Unable to get image from the DALL-E URL.');
            return;
        }

        // create unique name for the image to be stored in azure
        const imageID = uuidv4();
        const blobName = `${storyID}_${imageID}.png`;

        // azure client
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const hostedImageURL = blockBlobClient.url;

        // upload image to azure
        const imageBuffer = Buffer.from(imageResponse.data);
        await blockBlobClient.upload(imageBuffer, imageBuffer.length);

        console.log(`Image "${blobName}" uploaded to Azure.`);

        return hostedImageURL;
    } catch (err) {
        console.error(err);
    }
}

const parseResponse = (res) => {
    res = res.split('\n')
    res = res.filter((para) => (para.length > 5))
    // const paragraphs =  res.filter((para) => !para.toLowerCase().startsWith("option"))
    // const options =  res.filter((para) => para.toLowerCase().startsWith("option"))

    title = res[0].split(': ')[1]
    res = res.slice(1)

    let texts = []
    let optionCnt = 0
    for (const text of res) {
        texts.push(text)
        if (text.toLowerCase().startsWith("option")) {
            optionCnt += 1
            if (optionCnt >= 3) {
                break
            }
        }
    }

    console.log("parse response: ", res)

    return { texts: res, title: title }
}

module.exports = { createStoryRoute, getAndStoreImage };