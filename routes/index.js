const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('Connected to the API');
    res.json({ message: 'Connected to the API' });
});

module.exports = router;