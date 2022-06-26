const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require("../models/user");
const bcrypt=require("bcryptjs");
//POST login
router.post('/login', async function(req,res,next){
    
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
        return res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ username:email });
    console.log(user)
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id },
            process.env.SECRET,
            {
              expiresIn: "2h",
            }
          );
     
          // save user token
    
          // user
        return res.status(200).json({token:token});
        }
       return res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
});


router.post("/register",async(req,res)=>{

        // Our register logic starts here
        try {
          // Get user input
          const { email, password } = req.body;
      
          // Validate user input
          if (!(email && password)) {
          return  res.status(400).send("All input is required");
          }
      
          // check if user already exist
          // Validate if user exist in our database
          const oldUser = await User.findOne({username:email });
      
          if (oldUser) {
           return res.status(409).send("User Already Exist. Please Login");
          }
      
          //Encrypt user password
          encryptedPassword = await bcrypt.hash(password, 10);
      
          // Create user in our database
          const user = await User.create({
            username: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
          });
      
          // Create token
          const token = jwt.sign(
            { user_id: user._id},
            process.env.SECRET,
            {
              expiresIn: "2h",
            }
          );
          // return new user
         return res.status(201).json({token:token});
        } catch (err) {
          console.log(err);
        }
    });


module.exports = router
