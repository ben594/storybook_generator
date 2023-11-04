require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

const PORT = process.env.PORT;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

// routes
const createUserRoute = require('./routes/createUser');
const loginRoute = require('./routes/login');
const getStoriesRoute = require('./routes/getStories');
const getStoryRoute = require('./routes/getStory');
const { createStoryRoute } = require('./routes/createStory');
const continueStoryRoute = require('./routes/continueStory');

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// create user route
app.use('/create-user', createUserRoute);

// login route
app.use('/login', loginRoute);

// get stories route
app.use('/get-stories', getStoriesRoute);

// get story route
app.use('/get-story', getStoryRoute);

// create story route
app.use('/create-story', createStoryRoute);

// continue story route
app.use('/continue-story', continueStoryRoute);

const start = async () => {
    try {
        await mongoose.connect(MONGO_DB_URI);
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        });
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
};
  
start();
