const express = require("express");
const User = require("../models/user");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//render register page
exports.registerPage = async (req, res) => {
  try {
    res.render("register", { Message: null });
  } catch (err) {
    res.status(404).send("Page Not Found !");
  }
};

//registring user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isExist = await User.findOne({ username: username, email: email });
    if (isExist) {
      return res.render("register", {
        Message: "Username or Email Already Exists",
      });
    } else {
      const user = new User({ username, email, password });
      await user.save();
      res.redirect("/login");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

//render login page
exports.loginPage = async (req, res) => {
  try {
    res.render("login", { errorMessage: null });
  } catch (err) {
    res.status(404).send("Page Not Found !");
  }
};

//login user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.render("login", {
        errorMessage: "Username does not exists !",
      });
    }
    const VerifPassword = await bcyrpt.compare(password, user.password);
    if (!VerifPassword) {
      return res.render("login", { errorMessage: " Incorrect Password !" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY
    );
    res.cookie("token", token);
    return res.redirect("/");
  } catch (err) {
    console.log(err.message);
  }
};

//logout user
exports.logoutUser = async (req, res) => {
  await res.clearCookie("token");
  return res.redirect("/");
};
