const express = require('express');

const router = express.Router();



// Get profile
router.get('/', (req, res) => {
    res.json(profile);
});

// Update profile
router.put('/', (req, res) => {
    const { name, email, age } = req.body;
    if (name) profile.name = name;
    if (email) profile.email = email;
    if (age) profile.age = age;
    res.json(profile);
});

module.exports = router;