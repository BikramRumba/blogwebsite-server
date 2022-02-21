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
const categoriesRoute = require('./routes/categories')
const multer = require('multer');
const path = require('path');

// TO send JSON objects inside the body 
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));


// Connected to the database
mongoose.connect(process.env.MONGO, 
    {useNewUrlParser:true}, 
    ()=>console.log('Connected to DB'));

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, "images");
    }, filename:(req, file, cb)=>{
        cb(null,req.body.name);
    }
});

const upload = multer({storage:storage});
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json("File has been uploaded.")
})

//importing route middlewares
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoriesRoute);

// Listening to the port

app.listen(5000, ()=>console.log("Backend is running"));