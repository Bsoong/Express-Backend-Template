const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const dummyUsers = [
    {
        id: "1234",
        username: "BrandoSando@gmail.com",
        password: "gabbagooba"
    }
];

const constructorMethod = (app) => {
    app.use(passport.initialize());

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            let user;
            try {
                user = dummyUsers.find(u => u.username === email)
                console.log('yo dude', user)
            } catch (e) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            return done(null, user)
        },
    ));

    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    }, async (jwtPayload, done) => {
        try {
            const { id, username } = jwtPayload;
            const user = dummyUsers.find(u => u.id === id)
            console.log('is this it?', jwtPayload)
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));
}

module.exports = constructorMethod;
