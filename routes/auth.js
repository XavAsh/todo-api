const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.get('/signup', (req, res) => {
    res.send('Signup page');
});

router.post('/signup', async (req, res) => {
    const { email, password, display_name } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with that email.' });
        }

        const newUser = await User.create({
            email,
            password,
            display_name
        });

        res.status(201).json({
            message: 'User created successfully',
            user: {
                email: newUser.email,
                display_name: newUser.display_name
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

router.post('/verify-token', async (req, res) => {
    if (!req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        let token = req.headers.authorization.split(' ')[1];
    }else {
            return res.status(401).json({ error: 'Unauthorized' });
        }

});

module.exports = router;