const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const { User, Story } = require('../models/modelSchema');

// route: /create-user

router.get('/', (req, res) => {
    res.send('Welcome to the create user route!');
});

router.post('/', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        // check if user already exists
        const user = await User.findOne({ username: username });
        if (user != null) {
            return res.status(500).send("Username has already been taken");
        }

        // create new user document in database
        const newUser = new User({ username: username, password: password });
        const insertedUser = await newUser.save();
        return res.status(201).json(insertedUser);
    } catch (err) {
        return res.status(500).send("Unable to signup");
    }
});

module.exports = router;
