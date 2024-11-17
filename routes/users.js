// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const auth = require('../middleware/auth');

// router.post('/register', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 8);
//         const user = new User({ name, email, password: hashedPassword });
//         await user.save();
//         const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
//         res.status(201).send({ user, token });
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) throw new Error('Invalid login credentials');
        
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) throw new Error('Invalid login credentials');
        
//         const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
//         res.send({ user, token });
//     } catch (error) {
//         res.status(400).send({ error: error.message });
//     }
// });

// module.exports = router;

