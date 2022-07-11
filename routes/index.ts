import express, { Request, Response, Application } from 'express';
const apiRoutes = require('./api');
const authRoutes = require('./auth');
const auth = require("../middleware/auth")
const constructorMethod = (app: Application) => {
    app.use('/api', auth, apiRoutes);
    app.use('/auth', authRoutes);
    app.get('*', (req: Request, res: Response) => {
        res.json({
            error: 'Not a valid route',
        });
    });
};

module.exports = constructorMethod;