const express = require('express');
const router = express.Router()

// route: /get-story

router.get('/', (req, res) => {
    res.send('Welcome to the get story route!');
});

module.exports = router;