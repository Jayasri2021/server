const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');

// Sign up
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password,course } = req.body;
        if(!name||!email||!password||!course){res.status(201).json({message:"Mandatory fields are name,email,password,course"});return}
        
        console.log('Received signup request:', { name, email, course }); // Add this
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Begin transaction
        await pool.query('BEGIN');
        
        console.log('Starting user creation...'); // Add this
        
        // Create user
        const userResult = await pool.query(
            'INSERT INTO users (name, email, password, course) VALUES ($1, $2, $3 , $4) RETURNING user_id',
            [name, email, hashedPassword,course]
        );
        
        console.log('User created:', userResult.rows[0]); // Add this
        
        // Create course enrollment
        await pool.query(
            'INSERT INTO courses (course_name, user_id) VALUES ($1, $2)',
            [course, userResult.rows[0].user_id]
        );
        
        await pool.query('COMMIT');
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Signup error:', error); // Add this
        if (error.constraint === 'users_email_key') {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: error.message });
    }
});


// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password, course } = req.body;
        if(!email||!password||!course){res.status(201).json({message:"Mandatory fields are email,password,course"});return }
        
console.debug(email,password,course)
        // Check user exists
        const userResult = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const user = userResult.rows[0];
        
        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        await pool.query(
            'INSERT INTO courses (course_name, user_id) VALUES ($1, $2)',
            [course, user.user_id]
        );
        
        res.json({ message: 'Login successful and course enrolled',user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// In auth.js - to check users
router.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT user_id, name, email, created_at FROM users');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: error.message });
    }
});

// In auth.js - to check courses
router.get('/courses', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.course_id, c.course_name, u.name as user_name, u.email, c.enrollment_date 
            FROM courses c 
            JOIN users u ON c.user_id = u.user_id
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;