const express = require("express");
const router = express.Router();
const User = require("../model/register");
const bcrypt = require("bcrypt");
const emailvalidator = require("email-validator");

router.post("/", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!emailvalidator.validate(email)) {
      return res.status(400).json({ error: "invalid email" });
    }
    const existingUser = await User.findOne({ userName, email });

    if (existingUser) {
      return res.status(400).json({ error: "user already exists. Proceed to Login" });
    }

    const existingUserName = await User.findOne({ userName });

    if (existingUserName) {
      return res.status(400).json({ error: "username already exists." });
    }

    const existingUserEmail = await User.findOne({ email });

    if (existingUserEmail) {
      return res.status(400).json({ error: "email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ userName, email, password:hashedPassword });
    await user.save();

    return res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Registered failed" ,err});
  }
});

module.exports = router;
