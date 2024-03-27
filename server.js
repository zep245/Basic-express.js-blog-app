require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const app = express()
mongoose.connect("mongodb://127.0.0.1/BasicBlog" , {useNewUrlParser:true})
const expressLayouts = require("express-ejs-layouts")
const path = require('path');
const postRoutes = require("./routes/post")
const Posts = require("./models/postModel")
const methodOverride = require("method-override")



const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

app.use(expressLayouts)
app.set('view engine', 'ejs');
app.use(express.static(path.join('public')));
app.use(methodOverride("_method"))

app.use(express.urlencoded({extended:false}))



app.get("/" ,async (req ,res) => {
    try {
        // const loggedIn = req.session && req.session.userId;
        const posts = await Posts.find().sort({createdAt : "desc"})
        res.render("home.ejs" , {posts : posts})
    } catch (err) {
        console.log(err)
        res.render("home.ejs" , {posts : posts})
    }
    
     
})

app.use("/posts" , postRoutes)




app.listen(3000)