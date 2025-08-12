const express=require("express");
const router=express.Router();
const Contact=require("../models/Contact");

router.post('/',async(req,res)=>{
    // when data is transfered through frontend, it will recieve in the form of (req.body)
    const {username,email}=req.body;

    if(!username || !email){
        return res.status(400).json({success:false,message:"please provide both username and email"});
    }

    try{
        // create a new entry of contact
        const newContact=new Contact({
            username,email
        });

        // storing the data in the database using save() method.
        const savedContact=await newContact.save();

        res.status(201).json({
            message:true,
            message:"your message ahs been recieved",
            data:savedContact
        });

    }catch(err){
        console.log("Error saving contact",err);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        });

    }
});

module.exports=router;