const express = require('express');
const router = express.Router();
const Pool = require('pg-pool');
const { pool } = require('../config/db');
const contactPool = new Pool({
    connectionString: process.env.DATABASE_URL
});

router.post('/contact', async (req, res) => {
    try {

        const { name, phone, email, message } = req.body;
        if(!name||!phone || !email||!message){res.status(201).json({message:"Mandatory fields are name,email,phone,message"});return}

        const result = await contactPool.query(`
            INSERT INTO contact (name, phone, email, message)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [name, phone, email, message]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error in contact route:', error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/contact/get', async (req, res) => {
    try {
        const result = await contactPool.query('SELECT * FROM contact');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;