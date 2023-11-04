const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const { User, Story } = require('../models/modelSchema');

// route: /get-stories

router.get('/', (req, res) => {
    res.send('Welcome to the get stories route!');
});

router.post('/', async (req, res) => {
    try {
        // find user document and return list of story IDs
        const username = req.body.username;
        const user = await User.findOne({ username: username });
        const storyIDs = user.storyIDs;
        return res.status(200).json({ storyIDs: storyIDs });
    } catch {
        return res.status(500).send(err.stack);
    }
});

module.exports = router;