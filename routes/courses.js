const express = require('express');
const router = express.Router();
const Pool = require('pg-pool');

const coursePool = new Pool({
    connectionString: process.env.DATABASE_URL
});

router.post('/coursespost', async (req, res) => {
    try {
        const { name, course, email } = req.body;
        
        const result = await coursePool.query(`
            INSERT INTO courses (name, course, email)
            VALUES ($1, $2, $3)
            RETURNING *
        `, [name, course, email]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error in contact route:', error);
        res.status(400).json({ error: error.message });
    }
});
router.get('/test', async (req, res) => {
    res.json({ message: "Courses API is working" });
});

module.exports = router;