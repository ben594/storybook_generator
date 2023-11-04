const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { OpenAI } = require('openai');
const mongoose = require('mongoose');
const { User, Story } = require('../models/modelSchema');
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const axios = require('axios');

// openai config
const openai = new OpenAIApi({
    apiKey: process.env.OPEN_API_KEY,
});

// azure config
const accountName = process.env.AZURE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_ACCOUNT_KEY;
const containerName = process.env.AZURE_CONTAINER_NAME;
const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);

// route: /create-story

router.get('/', (req, res) => {
    res.send('Welcome to the create story route!');
});

router.post('/', async (req, res) => {
    try {
        // create story document in the database
        // get user input from request
        const username = req.body.username;
        const title = req.body.title;
        const age = req.body.age;
        const mainCharacter = req.body.mainCharacter;
        const keywords = req.body.keywords;
        const userPrompt = req.body.prompt;

        // check user exists
        const user = await User.findOne({ username: username });
        if (user === null) {
            return res.status(500).send("Username does not exist");
        }

        // get output from chat gpt
        const chatPrompt = getChatPrompt(age, mainCharacter, keywords, userPrompt);
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: chatPrompt }],
            model: "gpt-3.5-turbo",
        });

        // get output from dalle
        const style = "any style"; // TODO: implement style for dalle images
        const imagePrompt = getImagePrompt(chatPrompt, style);
        const image = await openai.createImage({
            prompt: imagePrompt,
            n: 1,
            size: "256x256",
        });
        imageURL = response.data.data[0].url;

        // store dalle output in azure and get hosted image url
        hostedImageURL = getAndStoreImage(imageURL, username, storyID);

        // generate new story document and add to database
        const storyID = uuidv4(); 
        const newStory = new Story({ storyID: storyID, title: title, texts: [chatCompletion], images: [hostedImageURL] });
        const insertedStory = await newStory.save();

        // link story id to user in the database
        var userStories = user.storyIDs;
        userStories.append(hostedImageURL);
        user.storyIDs = userStories;
        await user.save();

        // return story object
        return res.status(201).json(insertedStory);

    } catch (err) {
        return res.status(500).send(err.stack);
    }
});

function getChatPrompt(age, mainCharacter, keywords, prompt) {
    // TODO: fill in more detailed chat prompt
    const dummyPrompt = "Tell me a story."
    return dummyPrompt;
}

function getImagePrompt(description, style) {
    // TODO: fill in more detailed image prompt
    const dummyPrompt = "Generate a random image."
}

async function getAndStoreImage(imageURL, username, storyID) {
    try {
        // get image from dalle image URL
        const imageResponse = await axios.get(imageURL, { responseType: 'arraybuffer' });
        if (imageResponse.status !== 200) {
            console.error('Unable to get image from the DALL-E URL.');
            return;
        }

        // create unique name for the image to be stored in azure
        const imageID = uuidv4(); 
        const blobName = `${username}_${storyID}_${imageID}`;

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

module.exports = { router, getChatPrompt, getImagePrompt };