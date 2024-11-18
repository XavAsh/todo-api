const express = require('express');
const router = express.Router();
const sql = require('../core/sql');


router.post('/', async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send('Title and description are required');
    }

    try {
        const result = await sql.sqlQuery('INSERT INTO task (title, description) VALUES (?, ?)', [title, description]);
        res.status(201).send({ id: result.insertId, title, description });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;