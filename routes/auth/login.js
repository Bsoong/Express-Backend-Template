const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const passport = require('passport');


const router = express.Router();

router.post('/', async (req, res) => {
    console.log('here')
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log(user)
        if (err) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user,
            });
        }
        return req.login(user, { session: false }, (error) => {
            if (error) {
                res.status(400).send("here", error);
            }
            // generate a signed son web token with the contents
            // of user object and return it in the response
            const token = jwt.sign(user, process.env.JWT_SECRET);
            return res.status(200).json({ user, token });
        })
    })(req, res);
});

module.exports = router;
