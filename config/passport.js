const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

// User Authentication Set-Up

module.exports = function(passport) {
    passport.use(new LocalStrategy({
        username: 'username',
        password: 'password'
    }, function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username and/or password.' });
            }
            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (!isMatch) return done(null, false, {message: 'Incorrect username and/or password'});
                else return done(null, user);
            });
        });
    }
    ))
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}