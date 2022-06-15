//node modules
const express = require('express') //express
const app = express() //express function
const bodyParser = require("body-parser"); //body parser
const MongoClient = require("mongodb").MongoClient; //mongo DB client
const path = require("path"); //adding path module
require("dotenv").config({path: path.resolve(__dirname, ".env")}); //adding ENV files to server.js
const connectionStr = "";
const PORT = process.env.PORT; //creating port
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname)); //adding ability to send static web pages 
app.set("view engine", "ejs"); // setting EJS view engine


app.get("/", (res, req) =>{
    req.render("index");
    console.log("Rendering Index.ejs");
    console.log(process.env.TEST);

})

app.listen(PORT, ()=>{
    console.log("Listening on " + PORT);
})