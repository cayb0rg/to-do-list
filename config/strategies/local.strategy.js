import { Strategy as LocalStrategy } from 'passport-local';
import { findOne } from '../../models/User';

// passport local stategy is what passport uses to authenticate a user
export default function localStrategy() {
    passport.use(new LocalStrategy(
        async function(username, password, done) {
            // find the user in the database
            const user = await findOne({ username: username }).catch(err => {
                if (err) { return done(err); }

            });
            // if the user is not found
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            // if the password is incorrect
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        }
    ))
}