const express = require('express');
const connect = require('./config/db');
const router = require('./routes/user.route');
const blog = require('./routes/articles');
const cookies=require("cookie-parser");
const { allarticle } = require('./controllers/article.controllers');

const app = express();
app.use(cookies())
app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.set("view engine" ,"ejs");
app.set("views",__dirname+'/views');
app.use(express.static(__dirname+"/public"))
app.use("/user",router)
app.use("/article",allarticle)


app.get("/",(req,res)=>{
    res.send("Welcome to the movie API")
  })
  
app.listen(8090 , ()=>{
    console.log("starting server");
    connect();
})