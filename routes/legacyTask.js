const express = require('express');
const router = express.Router();
const sql = require('../core/sql');


router.get('/', async (req, res) => {
    let query = "SELECT * FROM task";
    const params = [];
    const { title, done, due, limit, page} = req.query;
    const today = new Date();

    switch (true) {
        case !!title:
            query += " WHERE title LIKE ?";
            params.push(`%${title}%`);
            break;
        case !!done:
            query += params.length ? " AND done = ?" : " WHERE done = ?";
            params.push(done);
            break;
        case due === '1':
            query += params.length ? " AND due_date <= ?" : " WHERE due_date <= ?";
            params.push(today);
            break;
        case due === '0':
            query += params.length ? " AND due_date >= ?" : " WHERE due_date >= ?";
            params.push(today);
            break;
    }
    
    if (limit) {
        query += " LIMIT ?";
        params.push(parseInt(limit, 10));
    }

    if (limit && page) {
        query += " OFFSET ?";
        params.push(parseInt(limit, 10) * (parseInt(page, 10) - 1));
    }

    try {
        const result = await sql.sqlQuery(query, params);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await sql.sqlQuery('SELECT * FROM task WHERE id = ?',[id]);
        if (result.length > 0) {
            res.send(result[0]); 
        } else {
            res.status(404).send('Task not found'); 
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description , due_date, type_id } = req.body;
        if (!title || !description) {
            return res.status(400).send('Title and description are required');
        }
        const result = await sql.sqlQuery('INSERT INTO task (title, description, due_date, type_id) VALUES (?, ?, ?, ?)', [title, description, due_date, type_id]);
        res.status(201).send({ id: result.insertId, title, description, due_date, type_id });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;