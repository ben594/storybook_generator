const express = require('express');
const router = express.Router()

// route: /create-user

router.get('/', (req, res) => {
    res.send('Welcome to the create user route!');
});

module.exports = router;