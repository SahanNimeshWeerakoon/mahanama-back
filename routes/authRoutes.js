require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Model = require('../models/AuthModel');

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!(username && password)) {
        return res.status(400).json({ msg: "All input is required" });
      }
  
      const oldUser = await Model.findOne({ username });
  
      if (oldUser) {
        return res.status(409).json({ msg: "User Already Exist. Please Login" });
      }
  
      encryptedPassword = await bcrypt.hash(password, 10);
  
      const user = await Model.create({
        username: username.toLowerCase(),
        password: encryptedPassword,
      });
  
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );

      return res.status(201).json({username, password: user.password, _id: user._id, token});
    } catch (err) {
      return res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!(username && password)) res.status(400).json({msg: "Please enter username and password"});

        const user = await Model.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {user_id: user._id, username},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "24h"
                }
            );

            return res.status(200).json({username, password: user.password, _id: user._id, token});
        }
        return res.status(400).json({ msg: "Invalid Credentials" });
    } catch (e) {

    }
});

module.exports = router;