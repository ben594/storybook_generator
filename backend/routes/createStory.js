const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { OpenAI } = require('openai');

const openai = new OpenAIApi({
    apiKey: process.env.OPEN_API_KEY
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
        const age = req.body.age;
        const mainCharacter = req.body.mainCharacter;
        const keywords = req.body.keywords;
        const prompt = req.body.prompt;

        // check user exists
        const user = await User.findOne({ username: username });
        if (user === null) {
            return res.status(500).send("Username does not exist");
        }

        // get output from chat gpt

        // generate new story id
        const storyID = uuidv4(); 

    } catch(err) {
        return res.status(500).send(err.stack);
    }
});

function getPrompt(age, mainCharacter, keywords, prompt) {

}

module.exports = router;