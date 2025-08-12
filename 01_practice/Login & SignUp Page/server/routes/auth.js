const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const jwt=require('jsonwebtoken');


// @route   POST api/auth/signup
// @desc    Register a new user
// @access  Public

router.post('/signup', async (req, res) => {
    const { firstname, lastname, email, contact, password } = req.body;

    try {
        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        //create new user instance
        user = new User({
            firstname, lastname, email, contact, password
        });

        //  hash the password

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save user into database

        await user.save();

        res.status(201).json({ msg: 'User created successfully' });



    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST api/auth/login
// @desc    Authenticate user & get token (Login)
// @access  Public


router.post('/login',async(req,res)=>{
    const {identifier,password}=req.body;

    try{
        // 1. Check if the user exists using email OR contact number
        // The $or operator finds a document that matches any of the conditions.
        const user=await User.findOne({
            $or:[
                {email:identifier},
                {contact:identifier}
            ]
        });

        // if no user is found with that identifier
        if(!user){
            return res.status(400).json({msg:'Invalid credentials'});
        }

        // 2. Compare the provided password with the stored hashed password

        const isMatch=await bcrypt.compare(password,user.password);

        //if password dont match
        if(!isMatch){
            return res.status(400).json({msg:'Invalid credentials'});
        }
        // 3. If credentials are correct, create and sign a JWT
        const payload={
            user:{
                id:user.id, // we'll use the mongoDB document ID
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Your secret key from .env
            {expiresIn:'1h'},   // Token expires in 1 hour
            (err,token)=>{
                if(err) throw err;
                res.json({token}); // Send the token back to the client
            }
        );
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});
module.exports = router;







