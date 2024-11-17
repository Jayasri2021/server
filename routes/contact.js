// routes/contact.js
const express = require('express');
const router = express.Router();
const Pool = require('pg-pool');

const contactPool = new Pool({
    connectionString: process.env.CONTACT_DATABASE_URL
});


router.post('/contact', async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;
        
      
        const result = await contactPool.query(`
            INSERT INTO contact (name, phone, email, message)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [name, phone, email, message]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error in contact route:', error);
        res.status(400).json({ error: error.message });
    }
});


router.get('/test', async (req, res) => {
    res.json({ message: "Contact API is working" });
});

module.exports = router;