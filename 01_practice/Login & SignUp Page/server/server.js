const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();

const app=express();
const PORT=process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(cors());

// connect to mongoDb

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('successfuly connected to mongodb')
}).catch((err)=>{
    console.log("connection error",err);
    process.exit();
});

// import and use auth routes

const authRoutes=require('./routes/auth');
app.use('/api/auth',authRoutes);

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})


