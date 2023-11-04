const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { OpenAI } = require('openai');
const mongoose = require('mongoose');
const { User, Story } = require('../models/modelSchema');

const openai = new OpenAIApi({
    apiKey: process.env.OPEN_API_KEY,
});

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
        image_url = response.data.data[0].url;

        // TODO: store dalle output in azure
        hosted_image_url = image_url // TODO: replace this with the actual hosted image url

        // generate new story document and add to database
        const insertedStory = await createAndSaveStory(Story, title, chatCompletion, hosted_image_url);

        // link story id to user in the database
        await linkStoryToUser(user, insertedStory.storyID);

        // return story object
        return res.status(201).json(insertedStory);

    } catch(err) {
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

async function createAndSaveStory(Story, title, chatCompletion, hosted_image_url) {
    const storyID = uuidv4(); 
    const newStory = new Story({ 
        storyID: storyID, 
        title: title, 
        texts: [chatCompletion], 
        images: [hosted_image_url] 
    });
    const insertedStory = await newStory.save();
    return insertedStory;
}

async function linkStoryToUser(user, storyID) {
    var userStories = user.storyIDs;
    userStories.push(storyID);
    user.storyIDs = userStories;
    await user.save();
}

module.exports = {
    router,
    createAndSaveStory,
    linkStoryToUser
};