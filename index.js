const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// environment variable
dotenv.config();



// Importing routes 
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')


// TO send JSON objects inside the body 
app.use(express.json());



// Connected to the database
mongoose.connect(process.env.MONGO, 
    {useNewUrlParser:true}, 
    ()=>console.log('Connected to DB'));


//importing route middlewares
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

// Listening to the port

app.listen(3000, ()=>console.log("Backend is running"));