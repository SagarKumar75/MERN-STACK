const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();   // Loads variables from .env file

const contactRoutes = require('./routes/contact');

const app = express();

// middleware
app.use(cors());  // Allows cross-origin requests (from your React app)
app.use(express.json());  // Parses incoming JSON requests

// connect to  mongoDB

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI).then(() => console.log("Connected to MongoDB")).catch((err) => console.log("mongoDB connection error", err))

// Define a simple root route for testing

app.get('/', (req, res) => {
    res.send("contact form backend API is running...")
});

// Use the contact routes
// All routes in 'contact.js' will be prefixed with '/api/contact'

app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

