const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const { User, Story } = require('../models/modelSchema');

// route: /get-stories

router.get('/:username', async (req, res) => {
    try {
        // find user document and return list of story IDs
        const { username } = req.params;
        const user = await User.findOne({ username: username });
        if (user === null) {
            return res.status(500).send("Invalid username");
        }
        const storyIDs = user.storyIDs;
        return res.status(200).json({ storyIDs: storyIDs });
    } catch(err) {
        return res.status(500).send(err.stack);
    }
});

module.exports = router;
