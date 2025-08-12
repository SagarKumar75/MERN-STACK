const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        lowercase:true,
        match:[/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    createdAt:{
        type:Date,
        default:Date.now()
    
    },
});

module.exports=mongoose.model('Contact',contactSchema);