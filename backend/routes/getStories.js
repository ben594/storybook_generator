const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const { User, Story } = require('../models/modelSchema');

// route: /get-stories

router.get('/', async (req, res) => {
    try {
        // find user document and return list of story IDs
        const username = req.query.username;
        const user = await User.findOne({ username: username });
        if (user === null) {
            return res.status(500).send("Invalid username");
        }
        const storyIDs = user.storyIDs;

        let storyInfo = [];

        for (var i = 0; i < storyIDs.length; i++) {
            id = storyIDs[i];
            const story = await Story.findOne({ storyID: id });
            const title = story.title;
            const thumbnailURL = story.images[0];

            storyInfoEntry = {
                storyID: id,
                title: title,
                thumbnailURL: thumbnailURL
            };

            storyInfo.push(storyInfoEntry);
        }

        return res.status(200).json({ storyInfo: storyInfo });
    } catch(err) {
        return res.status(500).send(err.stack);
    }
});

module.exports = router;
