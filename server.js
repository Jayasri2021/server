//server.js - 11/19 at 3:55pm

// server.js
const express = require('express');
const cors = require('cors');
const session = require('cors');
require('dotenv').config();
const { connectDB, pool } = require('./config/db');
const contactRoutes = require('./routes/contact');
// const coursesRoutes = require('./routes/courses');

const authRoutes = require('./routes/auth');

const app = express();
connectDB();
app.use(express.json());
app.use(express.static('public'));

// Update CORS configuration
// app.use(cors({
//     origin: ['http://localhost:3000', 'https://your-frontend-domain.com'],
//     credentials: true
// }));

// app.use(session({
//     secret: process.env.SESSION_SECRET || 'Password321',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: process.env.NODE_ENV === 'production',
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000 // 24 hours
//     }
// }));

// Use routes
app.use('/api', contactRoutes);
app.use('/api', authRoutes);
// app.use('/api/', coursesRoutes);


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

// server.js - 11/19 bf 3:54pm
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const {connectDB, pool} = require('./config/db');
// const contactRoutes = require('./routes/contact');
// const authRoutes = require('./routes/auth');


// const app = express();

// connectDB();

// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));


// app.use('/api', contactRoutes);
// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// }).on('error', (err) => {
//     console.error('Server startup error:', err);
//     process.exit(1);
// });
// app.get('/health', (req, res) => {
//     res.json({ status: 'ok', message: 'Server is running' });
// });
