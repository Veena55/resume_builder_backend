const express = require('express');
const app = express();
const cors = require('cors');
const cookieSession = require('cookie-session');
// const passport = require('passport');
// const auth = require('./config/auth');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
require('./config/auth');
const mongoose = require('./config/db');

app.get('/', (req, res) => {
    return res.send("Welcome to Main Page");
});

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [process.env.COOKIE_KEY]
}));

// Enable CORS for all origins or specify certain origins
app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/resume', resumeRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server running on port 5000");
});