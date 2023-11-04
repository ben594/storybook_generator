require('dotenv').config()

const express = require('express');
const app = express();
const port = process.env.PORT;

// routes
const createUserRoute = require('./routes/createUser');
const loginRoute = require('./routes/login');
const getStoriesRoute = require('./routes/getStories');
const getStoryRoute = require('./routes/getStory');
const createStoryRoute = require('./routes/createStory');
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});