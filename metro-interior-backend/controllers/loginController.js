const express = require('express');
const bcrypt = require("bcrypt");
const userSchema = require('../models/user_schema');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.loginController = async (req , res)=>{
    try{
        const {email , password} = req.body;
        let user = await userSchema.findOne({email});
        if(!user){
           return res.status(400).json({
                success: false,
                message : "user do not exist, please do signup first"
            })
        }
        // console.log("milgya"); 

        try{
            const passwordValid = await bcrypt.compare(password , user.password);
           if(!passwordValid){
            return res.status(401).json({
                success : false,
                message : "password is not correct , try again"
            })
           }
        }
        catch(err){
           return res.status(500).json({
                success : false,
                message : "internal server error while matching your password"
            })
        }
        
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        user = user.toObject();
        user.token = token;
        user.password = undefined;
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
            httpOnly: true,
        };
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "thank you for logging in", // Fix "thankyou" to "thank you"
        });
        
    }
    catch(e){
        return res.status(400).json({
            success : false,
            message : "login failed"
        })
    }
}
