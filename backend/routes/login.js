const express = require('express');
const mongoose = require("mongoose")
const router = express.Router()
const { User, Story } = required('../models/modelSchema')

// route: /login
router.get('/', (req, res) => {
    res.send('Welcome to the login route!');
});

router.post('/', async (req, res) => {
    const username = req.body.username
    const user = await User.findOne({ username: username})
    if (user === null) {
        return false
    }
});

module.exports = router;