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
    const user = new User({ username, email, password });
    const registerUser = await user.save();
    registerUser
      ? res.render("register", { Message: "Account Created Successfully" })
      : res.render("register", {
          Message: "Username or Email already in user !",
        });
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
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    return res.redirect("/salles");
  } catch (err) {
    console.log(err.message);
  }
};

//logout user
exports.logoutUser = async (req, res) => {
  await res.clearCookie("token");
  return res.redirect("/login");
};
