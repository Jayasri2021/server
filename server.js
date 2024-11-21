const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB, pool } = require('./config/db');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const { verifyToken } = require('./middleware/auth'); 

const app = express();
connectDB();

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000', 'https://server-8few.onrender.com'],
    credentials: true
}));

app.use('/api/contact', verifyToken, contactRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected successfully');
    }
});