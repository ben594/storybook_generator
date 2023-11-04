const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User, Story } = require('../models/modelSchema');
const { OpenAI } = require('openai');

// process openAI key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// route: /continue-story
router.get('/', (req, res) => {
    res.send('Welcome to the continue story route!');
});

// get current user story progression
router.post('/', async (req, res) => {
    const storyID = req.body.StoryID
    const userStories = await Story.findOne({ StoryID: StoryID })
    if (!userStories) {
        return res.status(404).send('Story not found');
    }

    const textProgress = userStories.texts
    const imageProgress = userStories.images

    // concatenate all previous text prompts to maintain story context
    const concatenatedTextPrompts = textList.join(" ");
    // track last image for consistent story images
    const latestImage = imageProgress[imageProgress.length - 1];

    // generate the next part of the story by continuing from the concatenated text prompts
    const nextTextPrompt = continueStoryPrompt(concatenatedTextPrompts);
    // generate the prompt for the next image based on the latest image's description and style
    const nextImagePrompt = createNewImagePrompt(latestImage.description, latestImage.style);

     // Generate new text and image
     const newText = await generateText(nextTextPrompt); 
     const newImage = await generateImage(nextImagePrompt); 
 
     // Save the new text and image to the user's story
     userStories.text_progression.push(newText);
     userStories.images.push(newImage);
     await userStories.save();

     // Respond with the new story parts
     res.json({ newText, newImage });
});

// function to create a new text prompt based on the previous text
function continueStoryPrompt(textPrompt) {
    // TODO 
    const prompt = `Continue the story based on the following text: "${textPrompt}"`;
    return prompt;
}

// function to create a new image prompt from previous image prompts
function contineuImagePrompt(description, style) {
    // TODO
    const modifiedDescription = `Create an image that follows the theme of the previous one but introduces new elements based on the latest part of the story: ${description}`;
    return modifiedDescription;
}

async function generateText(prompt) {
    // TODO
}

async function generateImage(prompt) {
    // TODO
}

module.exports = router;
