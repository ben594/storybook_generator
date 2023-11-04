const express = require('express');
const router = express.Router()

// route: /login

router.get('/', (req, res) => {
    res.send('Welcome to the login route!');
});

module.exports = router;