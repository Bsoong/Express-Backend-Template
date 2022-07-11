import express, { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require('bcryptjs');

router.post('/', async (req: Request, res: Response) => {
    try{
        const { firstName, lastName, email , password } = req.body;
        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({email});
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const encryptedPass = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName, 
            lastName, 
            email: email.toLowerCase(),
            password: encryptedPass
        });

        const token = jwt.sign(
            { user_id: newUser._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "30d",
            }
          );
          // save user token
          newUser.token = token;
      
          // return new user
          res.status(201).json(newUser);
    } catch(e) {
        res.status(403).send(`Error trying to register ${e}`)
    }
});

module.exports = router;
