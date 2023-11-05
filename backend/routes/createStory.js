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
        const userPrompt = req.body.prompt;

        // check user exists
        const user = await User.findOne({ username: username });
        if (user === null) {
            return res.status(500).send("Username does not exist");
        }

        // get output from chat gpt
        const chatResponse = await getChatResponse(age, mainCharacter, userPrompt);

        // get output from dalle
        const style = "any style"; // TODO: implement style for dalle images
        const description =  chatResponse.story; // TODO: set image description
        const imageURL = await getDalleResponse(description, style);

        // generate new story id
        const storyID = uuidv4(); 

        // store dalle output in azure and get hosted image url
        const hostedImageURL = await getAndStoreImage(imageURL, storyID);

        // add story to database
        const newStory = new Story({ 
            storyID: storyID, 
            title: chatResponse.title, 
            texts: [chatResponse.story],
            images: [hostedImageURL] 
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

async function getChatResponse(age, mainCharacter, userPrompt) {
    const chatPrompt = "Tell me the first paragraph of a story. Make the paragraph 20 words long.";
    const titlePrompt = "Give one potential title for this story";

    // get story
    const storyCompletion = await openai.chat.completions.create({
        messages: [{role: "user", content: chatPrompt }],
        model: "gpt-3.5-turbo",
    });
    const storyResponse = storyCompletion.choices[0].message.content;
    console.log("Received story response: ", storyResponse);

    // get title
    const titleCompletion = await openai.chat.completions.create({
        messages: [{role: "user", content: titlePrompt }],
        model: "gpt-3.5-turbo",
    });
    const titleResponse = titleCompletion.choices[0].message.content;
    console.log("Received title response: ", titleResponse);

    return { story: storyResponse, title: titleResponse };
}

async function getDalleResponse(description, style) {
    // TODO: include style in the prompt
    const prompt = description;
    const image = await openai.images.generate({
        prompt: prompt,
        n: 1,
        size: "256x256",
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

module.exports = { createStoryRoute, getAndStoreImage };