const express = require('express');
const mongoose = require("mongoose")
const router = express.Router()
const { User, Story } = required('../models/modelSchema')

// route: /login
router.get('/', (req, res) => {
    res.send('Welcome to the login route!');
});

router.post('/', async (req, res) => {
    // check if user exists in the database
    let loginStatus = false;
    const username = req.body.username
    const user = await User.findOne({ username: username})
    if (user != null) {
        loginStatus = true;
    }

    return res.status(200).send({ loginStatus: loginStatus });
});

module.exports = router;
