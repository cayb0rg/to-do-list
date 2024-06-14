/* eslint-disable indent */
/* eslint-disable linebreak-style */
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash-plus');
const mongoose = require('mongoose').set('debug', true);

// Routes
const dashboardRoutes = require('./routes/dashboard.js');
const authRoutes = require('./routes/authRoutes.js');
const { ensureAuthenticated } = require('./config/auth');

const app = express();

// Passport config
require('./config/passport')(passport);

// Bodyparser
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// Public
app.use('/public', express.static(path.join(__dirname, 'public')));

// Express session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// MongoDB Set-Up
console.log(`Connecting to mongodb....`);
// const uri = process.env.MONGODB_URI;
// mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/todolist', {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

console.log(`Connected to mongodb!`);

db.on('error', console.error.bind(console, 'MongoDB connection error'));

// ROUTES
app.use('/dashboard', ensureAuthenticated, dashboardRoutes);
app.use('/', authRoutes);

const port = process.env.PORT || 3000;

app.listen(port);
console.log(`App is now listening on port ${port}`);
