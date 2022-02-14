const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    return "test route";
});

module.exports = router;
