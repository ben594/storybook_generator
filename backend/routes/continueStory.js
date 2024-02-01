const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { OpenAI } = require('openai');
const mongoose = require('mongoose');
const { User, Story } = require('../models/modelSchema');
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const axios = require('axios');
const {getAndStoreImage} = require('./createStory')

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
        const chatHistory = story.chatHistory.map((obj) => ({role: obj.role, content: obj.content}));

        console.log("pastChatHistory: ", chatHistory)
        // get output from chat gpt
        const chatResponse = await continueChatResponse(chatHistory, story.texts.length, selectedOption);

        console.log("chatResponse: ", chatResponse)

        for (const text of chatResponse.parsedResponse.texts) {
            if (!text.toLowerCase().startsWith("option")) {
                let description = text
                let imageURL = await getDalleResponse(description)
                console.log("imageURL: ", imageURL)
                let hostedImageURL = await getAndStoreImage(imageURL, storyID);
                console.log("HOSTEDIMAGEURL: ", hostedImageURL)
                story.images.push(hostedImageURL)
                console.log("HOSTEDIMAGEURLs: ", story.images)
            }
        }

        console.log("FINISHED WAITING!!!\n\n\n\n")
        

        // Save the new texts and chatHistory to the user's story
        story.texts = story.texts.concat(chatResponse.parsedResponse.texts);
        story.chatHistory = chatResponse.chatHistory
        await story.save();

        // Respond with the updated story
        return res.status(201).json(story);
    } catch (err) {
        return res.status(500).send(err.stack);
    }
});

async function continueChatResponse(pastChatHistory, lenTexts, optionChoice) {
    const chatPrompt = lenTexts>30 ? 
    `
    ${optionChoice}

    Please end the story after this choice with a smooth ending. Display [END] at the end of the story. Do not display the option at the beginning, just display the story. Keep the response under 200 words please.
    `
    :
    `
    ${optionChoice}

    Please continue the story with the provided option. Do not display the option at the beginning, just display the story. Keep the response under 200 words please.
    `

    let chatHistory = pastChatHistory.concat([{role: 'user', content: chatPrompt}])

    // get title and story
    const storyCompletion = await openai.chat.completions.create({
        messages: chatHistory,
        model: "gpt-3.5-turbo",
    });
    const storyResponse = storyCompletion.choices[0].message.content;
    console.log("Received story response: ", storyResponse);

    chatHistory = chatHistory.concat({role: 'assistant', content: storyResponse})

    return {chatHistory, parsedResponse: parseResponse(storyResponse)};
}


async function getDalleResponse(description) {
    // TODO: include style in the prompt
    const prompt = `
    Create a word-free, scenic, and artistic image using the style of Studio Ghibli of the following story: ${description}
    `;
    const image = await openai.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: "1024x1024",
    });
    console.log("Received image url: ", image.data[0].url);
    const imageURL = image.data[0].url;
    return imageURL;
}

// async function getAndStoreImage(imageURL, storyID) {
//     try {
//         // get image from dalle image URL
//         const imageResponse = await axios.get(imageURL, { responseType: 'arraybuffer' });
//         if (imageResponse.status !== 200) {
//             console.error('Unable to get image from the DALL-E URL.');
//             return;
//         }

//         // create unique name for the image to be stored in azure
//         const imageID = uuidv4();
//         const blobName = `${storyID}_${imageID}.png`;

//         // azure client
//         const containerClient = BlobServiceClient.getContainerClient(containerName);
//         const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//         const hostedImageURL = blockBlobClient.url;

//         // upload image to azure
//         const imageBuffer = Buffer.from(imageResponse.data);
//         await blockBlobClient.upload(imageBuffer, imageBuffer.length);

//         console.log(`Image "${blobName}" uploaded to Azure.`);

//         return hostedImageURL;
//     } catch (err) {
//         console.error(err);
//     }
// }

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
    return {texts: res, title: title}
}

module.exports = router;
