import express, { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require("../../models/user");
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
   try {
       const {email, password} = req.body;
       if (!(email && password)) {
        res.status(400).send("All inputs are required");
      }
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "30d",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(`here ${err}`);
    }
});

module.exports = router;
