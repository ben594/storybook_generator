const express = require('express');
const vocabListRoute = express.Router();
const { v4: uuidv4 } = require('uuid');
const { OpenAI } = require('openai');
const mongoose = require('mongoose');
const { User, Story, VocabList } = require('../models/modelSchema');
const axios = require('axios');

// route: /vocab-list
vocabListRoute.get('/', (req, res) => {
    res.send('Welcome to the create story route!');
});

vocabListRoute.post('/create', async (req, res) => {
    try {
        // get user input from request
        const username = req.body.username;
        const title = req.body.title;
        const words = req.body.words;

        // check user exists
        const user = await User.findOne({ username: username });
        if (user === null) {
            return res.status(500).send("Username does not exist");
        }

        // generate new list id
        const listID = uuidv4();

        // add list to database
        const newList = new VocabList({
            vocabListID: listID,
            title: title,
            words: words,
        });
        const insertedList = await newList.save();

        // link list id to user in the database
        var userLists = user.vocabListIDs;
        userLists.push(listID);
        user.vocabListIDs = userLists;
        await user.save();

        // return story object
        return res.status(201).json(insertedList);
    } catch (err) {
        return res.status(500).send(err.stack);
    }
});

vocabListRoute.post('/get-lists', async (req, res) => {
    try {
        // get user input from request
        const username = req.body.username;

        // check user exists
        const user = await User.findOne({ username: username });
        if (user === null) {
            return res.status(500).send("Username does not exist");
        }

        let vocabListInfo = [];
        const vocabListIDs = user.vocabListIDs;
        for (var i = 0; i < vocabListIDs.length; i++) {
            const vocabList = await VocabList.findOne({ vocabListID: vocabListIDs[i] });
            const title = vocabList.title;
            const words = vocabList.words;

            const info = {
                title: title,
                words: words,
            };

            vocabListInfo.push(info);
        }

        console.log("get lists called: ", vocabListInfo);

        // return list of vocab list IDs
        return res.status(201).json(vocabListInfo);
    } catch (err) {
        return res.status(500).send(err.stack);
    }
});

vocabListRoute.post('/get-lists', async (req, res) => {
    try {
        const vocabListID = req.body.vocabListID;

        // check vocab list exists
        const list = await VocabList.findOne({ vocabListID: vocabListID });
        if (list === null) {
            return res.status(500).send("List does not exist");
        }

        // return list
        return res.status(201).json(list);
    } catch (err) {
        return res.status(500).send(err.stack);
    }
});

module.exports = { vocabListRoute };