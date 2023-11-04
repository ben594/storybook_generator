const express = require('express');
const router = express.Router()

// route: /create-story

router.get('/', (req, res) => {
    res.send('Welcome to the create story route!');
});

module.exports = router;