const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User, Story } = require('../models/modelSchema');
const { OpenAI } = require('openai');
const { getAndStoreImage } = require('./createStory');

// process openAI key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// route: /continue-story
router.get('/', (req, res) => {
    res.send('Welcome to the continue story route!');
});

// get current user story progression and add next page
router.post('/', async (req, res) => {
    try {
        // get story id from request and check the story exists
        const storyID = req.body.storyID;
        const story = await Story.findOne({ storyID: storyID });
        if (!story) {
            return res.status(500).send('Story not found');
        }

        const selectedOption = req.body.option;

        // get existing text and images of the story
        const textProgress = story.texts;
        const imageProgress = story.images;

        // concatenate all previous text progress to maintain story context
        const concatenatedTextProgress = textProgress.join(" ");
        console.log("Concatenated text progress: ", concatenatedTextProgress);

        // track last image for consistent story images
        const latestImageURL = imageProgress[imageProgress.length - 1];

        // generate the next part of the story by continuing from the concatenated text progress
        const newText = await generateContinuedText(concatenatedTextProgress, selectedOption);

        // generate the next image
        description = newText; // TODO: make description better
        style = "default style"; // TODO: implement style
        const newImageURL = await generateContinuedImage(description, style);

        // store dalle output in azure and get hosted image url
        const hostedImageURL = await getAndStoreImage(newImageURL, storyID);
        
        // Save the new text and hosted image to the user's story
        story.texts.push(newText);
        story.images.push(hostedImageURL);
        await story.save();

        // Respond with the updated story
        return res.status(201).json(story);
    } catch (err) {
        return res.status(500).send(err.stack);
    }
});

async function generateContinuedText(concatenatedTextProgress, selectedOption) {
    // TODO
    const prompt = `Continue the story based on the following text: "${concatenatedTextProgress}". Provide 20 more words to the story.`;

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
    });

    const chatResponse = chatCompletion.choices[0].message.content;
    console.log("Received chat response: ", chatResponse);

    return chatResponse;
}

async function generateContinuedImage(description, style) {
    // TODO
    const modifiedDescription = `Create an image that follows the theme of the story but introduces new elements based on the latest part of the story: ${description}`;
    const image = await openai.images.generate({
        prompt: modifiedDescription,
        n: 1,
        size: "256x256",
    });
    console.log("Received image url: ", image.data[0].url);
    const imageURL = image.data[0].url;
    return imageURL;
}

module.exports = router;
