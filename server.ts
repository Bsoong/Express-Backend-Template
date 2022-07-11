import express, { Application, Request, Response } from "express";
const configRoutes = require('./routes');
const auth = require('./middleware/auth')
require('dotenv').config();
require("./config/database").connect();
const bodyParser = require('body-parser');
const app: Application = express();

app.use(bodyParser.json());
configRoutes(app);
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}
