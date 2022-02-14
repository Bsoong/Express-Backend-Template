const passport = require('passport');
const apiRoutes = require('./api');
const authRoutes = require('./auth');

const constructorMethod = (app) => {
    app.use('/api', passport.authenticate('jwt', { session: false }), apiRoutes);
    app.use('/auth', authRoutes);

    app.get('*', (req, res) => {
        res.json({
            error: 'Not a valid route',
        });
    });
};

module.exports = constructorMethod;