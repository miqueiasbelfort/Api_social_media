const router = require("express").Router()
//modules
const bcrypt = require("bcrypt")

//model
const User = require("../models/User")

//REGISTER
router.post("/register", async (req, res) => {
    

    try {
        //generate new password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        })

        //save user and respond
        const user = await newUser.save()
        
        res.status(200).json(user)
    
    } catch (error) {
        res.status(500).json(error)        
    }

})

module.exports = router