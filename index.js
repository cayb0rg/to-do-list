var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/todoapp', {useNewUrlParser: true})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

var pug = require('pug');
app.set('view engine', 'pug');

var ToDoItem = require('./models/ToDoItem');
var Project = require('./models/Project');

app.get('/', function(req, res) {
    res.render('template');
})

app.listen(3000);