const express = require('express');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/',async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
    
        if(!user){
            return res.status(404).json({error :"no user found !! invalid email"});
        }
    
        if(!await bcrypt.compare(password,user.password)){
            return res.status(400).json({error : "password not matched"});
        }
    
        const token = jwt.sign({id:user._id},process.env.SECRET);
        user.tokens = user.tokens.concat({token : token})
        console.log(token)
        req.id = user._id;
        return res.status(200).json({message : "user loggedin successfully",token,user})
    
    } catch (error) {
        console.log(error)
        return res.status(400).json({error : "login failed"})
    }
})

module.exports = router