const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User, Story } = require('../models/modelSchema');

// route: /get-story

router.get('/:storyid', async (req, res) => {
    try {
        // find story document and return list of texts and image links
        const { storyID } = req.params;
        const story = await User.findOne({ storyID: storyID });

        // check if story exists
        if (story === null) {
            return res.status(500).send("Story does not exist");
        }

        const storyData = {
            texts: story.texts,
            imageURLs: story.images
        };

        return res.status(200).json({ story: storyData });
    } catch (err) {
        return res.status(500).send(err.stack);
    }
});

module.exports = router;