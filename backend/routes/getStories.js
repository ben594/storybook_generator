const express = require('express');
const router = express.Router()

// route: /get-stories

router.get('/', (req, res) => {
    res.send('Welcome to the get stories route!');
});

module.exports = router;