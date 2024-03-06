const express=require("express");
const User = require("../models/user")




//registring user
exports.registerUser = async (req,res) =>{
    try{
        const {username,email,password} = req.body;
        const user = new User({username,email,password});
        const registerUser = await user.save();
        registerUser ? res.status(201).send('REGISTRED!'):res.status(400).send('there is some error !');
    }catch(err){
        res.status(400).send(err.message);
    }
}