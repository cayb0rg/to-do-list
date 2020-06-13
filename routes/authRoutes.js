var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt');

var User = require('../models/User.js');

router.get('/', (req, res) => {
    res.render('homepage');
})

router.get('/signup', (req, res) => {
    res.render('sign-up', {errors: [], username: '', password: '', password2: ''});
})

router.post('/signup', function(req, res) {
    // Validation
    let errors = [];
    const {username, password, password2} = req.body;
    if (!username || !password || !password) {
        errors.push({msg: 'Please fill in all fields'});
    }
    
    if (password !== password2) {
        errors.push({msg: 'Passwords do not match'});
    }

    if  (password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters'});
    }

    if (errors.length > 0) {
        return res.render('sign-up', {errors, username, password, password2});
    } else {
        // Validation passed
        User.findOne({username: username}).then(user => {
            if (user) {
                errors.push({msg: 'Username is already taken'})
                return res.render('sign-up', {errors, username, password, password2})
            } else {
                // Create user
                let user = new User({
                    username,
                    password,
                })
                // Hash password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err;
                    // Set password to hashed
                    user.password = hash;
                    // Save user
                    user.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered');
                            res.redirect('/login');
                        })
                        .catch(err => console.log(err))
                }));
            }
        })
    }

    
})

router.get('/login', (req, res) => {
    res.render('login', {
        success_msg: req.flash('success_msg'), 
        error_msg: req.flash('error_msg'), 
        error: req.flash('error')
    });
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard', 
        failureRedirect: '/login', 
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', (req, res, next) => {
    res.render('profile');
})


router.get('/user/delete', (req, res) => {
    User.deleteOne({_id: req.user.id}, (err) => {
        if (err) return res.send(err);
        req.logout();
        req.flash('success_msg', 'Your account has been deleted.');
        res.redirect('/login');
    })
})

router.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'You are logged out')
    res.redirect('/login');
})

module.exports = router;