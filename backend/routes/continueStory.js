const express = require('express');
const router = express.Router()

// route: /continue-story

router.get('/', (req, res) => {
    res.send('Welcome to the continue story route!');
});

module.exports = router;