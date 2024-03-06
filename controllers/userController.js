const express = require("express");
const User = require("../models/user");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//registring user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    const registerUser = await user.save();
    registerUser
      ? res.status(201).send("REGISTRED!")
      : res.status(400).send("there is some error !");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

//login user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(404).send("user not found !");
    }
    const VerifPassword = await bcyrpt.compare(password, user.password);
    if (!VerifPassword) {
      res.status(404).send(" Incorrect Password !");
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    //res.send(`Hello ${user.username}`)
    res.send({ token: token });
  } catch (err) {
    console.log(err.message);
  }
};

exports.test = (req, res) => {
  res.status(200).send("Hello you have successfully logged in!");
};
