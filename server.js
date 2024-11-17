// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contact');
const coursesRoutes = require('./routes/courses');


const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.use('/api', contactRoutes);
app.use('/api', coursesRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});