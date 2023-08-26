const express = require('express');
const User = require('../model/user');
const router = express.Router();
const auth = require('../middleware/auth')
router.get('/',auth,async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.id,{tokens :[]})
        return res.status(200).json({message : "user log out successful"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({error : 'logout failed'});
    }
})

module.exports = router