const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req , res , next) =>{
    try{
        //extract jwt token
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer " , "");

        if(!token){
            res.status(401).json({
                success : false,
                message : "token missing"
            })
        } 
        // verify the token

        try{
            const payload = jwt.verify(token , process.env.JWT_SECRET);
            console.log(payload);
            req.user =  payload;
        }
        catch(e){
            return res.status(401).json({
                success : false,
                message : "token is invalid"
            })
        }
        next();
    }
    catch (err){
        return res.status(401).json({
            success : false,
            message : "something went wrong while verifying the token"
        })
    }
}

exports.isPassenger = (req , res , next) =>{
    try{
        if(req.user.role !== "Passenger"){
            return res.staus(401).json({
                success : false,
                message  : "this is a protected route for passenger "
            })
        }
        next()
    }
    catch(err){
        return res.status(500).json({
            success : false,
            messag: "user role can not be verified"
        })
    }
}

exports.isAdmin = (req , res , next) =>{
    try{
        if(req.user.role !== "Admin"){
            return res.staus(401).json({
                success : false,
                message  : "this is a protected route for admin "
            })
        }
        next()
    }
    catch(err){
        return res.status(500).json({
            success : false,
            messag: "user role can not be verified"
        })
    }
}   