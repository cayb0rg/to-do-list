var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash-plus');
var mongoose = require('mongoose').set('debug', true);

var app = express();

// Passport config
require('./config/passport')(passport);

// Bodyparser
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// Pug
var pug = require('pug');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

// Public
app.use('/public', express.static(path.join(__dirname, 'public')))

// Express session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// MongoDB Set-Up
mongoose.connect('mongodb://localhost/ToDoListAPI', {useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// Routes
var dashboard = require('./routes/dashboard.js');
var authRoutes = require('./routes/authRoutes.js');
var {ensureAuthenticated} = require('./config/auth');

app.get('/', (req, res, next) => {
    if (req.isAuthenticated())
        res.render('homepage', {loggedIn: true});
    else
        res.render('homepage', {loggedIn: false})
})
app.use('/dashboard', ensureAuthenticated, dashboard);
app.use('/', authRoutes);

var port = process.env.PORT || 3000;

app.listen(port);