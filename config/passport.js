const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

// User Authentication Set-Up

module.exports = async function(passport) {
    passport.use(new LocalStrategy({
        username: 'username',
        password: 'password'
    }, async function(username, password, done) {
        const user = await User.findOne({ username: username }).catch(err => {
            if (err) { return done(err); }
        });

        if (!user) {
            return done(null, false, { message: 'Incorrect username and/or password.' });
        }
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch) return done(null, false, {message: 'Incorrect username and/or password'});
            else return done(null, user);
        });
    }
    ))

    // user.id is saved in the session and used later to deserialize the user
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // returns the user object based on the id
    passport.deserializeUser(async function(id, done) {
        const user = await User.findById(id).catch(err => {
            return done(err, null);
        });

        return done(null, user);
    });
}