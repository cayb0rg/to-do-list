/* eslint-disable linebreak-style */
/* eslint-disable indent */
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const async = require('async');

const User = require('../models/User.js');
const Project = require('../models/Project.js');
const ToDoItem = require('../models/ToDoItem.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/signup', (req, res) => {
    res.render('sign-up', {errors: [], username: '', password: '', password2: ''});
});

router.post('/signup', (req, res) => {
    // Validation
    const errors = [];
    const {username, password, password2} = req.body;
    if (!username || !password || !password) {
        errors.push({msg: 'Please fill in all fields'});
    }
    
    if (password !== password2) {
        errors.push({msg: 'Passwords do not match'});
    }

    if (password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters'});
    }

    if (errors.length > 0) {
        return res.render('sign-up', {errors, username, password, password2});
    } else {
        // Validation passed
        User.findOne({username: username}).then(user => {
            if (user) {
                errors.push({msg: 'Username is already taken'});
                return res.render('sign-up', {errors, username, password, password2});
            } else {
                // Create user
                let user = new User({
                    username,
                    password,
                });
                // Hash password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err;
                    // Set password to hashed
                    user.password = hash;
                    // Save user
                    user.save()
                        .then(user => {
                            // Create default project with to do
                            let defaultProject = new Project({
                                name: "Default Project",
                                user: user.id
                            });
                            defaultProject.save().then( proj => {
                                let defaultToDo = new ToDoItem({
                                    title: "Create your first to-do",
                                    description: "Let's create your first to-do! Go ahead and click the 'New To-Do' below.",
                                    dateCreated: new Date(),
                                    completed: false,
                                    project: proj._id
                                });
                                defaultToDo.save();
                            });

                            // Redirect
                            req.flash('success_msg', 'You are now registered');
                            res.redirect('/login');
                        })
                        .catch(err => console.log(err));
                }));
            }
        });
    }

    
});

router.get('/login', (req, res) => {
    res.render('login', {
        success_msg: req.flash('success_msg'), 
        error_msg: req.flash('error_msg'), 
        error: req.flash('error')
    });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard', 
        failureRedirect: '/login', 
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', (req, res, next) => {
    res.render('profile');
});


router.get('/user/delete', async (req, res) => {
    
    async.waterfall([
        function(callback) {
            Project.find({user: req.user.id}, (err, projects) => {
                if (err) return res.send(err);
                callback(null, projects);
            })
        },
        function(projects, callback) {
            async.each(projects, function(project, callback_inner) {
                ToDoItem.deleteMany({project: project._id}, (err) => {
                    if (err) return res.send(err);
                    callback_inner();
                })
            })
            callback();
        },
        function(callback) {
            Project.deleteMany({user: req.user.id}, (err) => {
                if (err) return res.send(err);
                callback();
            })
        },
        function(callback) {
            User.deleteOne({_id: req.user.id}, (err) => {
                if (err) return res.send(err);
                callback();
            });
        },
    ], function(err) {
        if (err) {
            console.log(err);
            req.flash('error_msg', 'There was an error deleting your account.');
            res.redirect('/user');
        } else {
            req.logout();
            req.flash('success_msg', 'Your account has been deleted.');
            res.redirect('/login');
        }
        
    })
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});

module.exports = router;