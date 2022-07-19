//node modules
const express = require('express') //express
const app = express() //express function
const bodyParser = require("body-parser"); //body parser gain access to req.body
const MongoClient = require("mongodb").MongoClient; //mongo DB client
const path = require("path"); //adding path module
const Restaurants = require("./models/restaurants"); // Restaurant module with schema and models
const Locations = require("./models/locations") //food locations module with schema and models
require("dotenv").config({path: path.resolve(__dirname, ".env")}); //adding ENV files to server.js
const connectionStr = process.env.MONGOSTR; //getting mongoDB string from .env file
const mongoose = require("mongoose"); // adding mongoose modules to this file
const PORT = process.env.PORT; //creating port for app.listen
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname)); //adding ability to send static web pages 
app.set("view engine", "ejs"); // setting EJS view engine



//connecting to MONGODB through mongoose 
mongoose.connect(connectionStr, {useUnifiedTopology: true, useNewUrlParser: true})
.then((result)=>{
    //connecting to server once DB connected successfully, will not connect if DB doesn't connect
        console.log("DB Connected");
    app.listen(PORT, ()=>{
        console.log("connected");
    })
   
})
.catch((err)=>{
    console.log(err);
})


// app.get("/random-item", async (req, res)=>{
   
//     let amountOfRestaurants = await Restaurants.estimatedDocumentCount();
//     let randomNumber = Math.floor(Math.random() * amountOfRestaurants);
//     let randomRestaurant = await Restaurants.findOne().skip(randomNumber);
//     res.render("index", {randomItem: randomRestaurant});
//     res.redirect("/");
//     });
    


//main page route handler
app.get("/", async (req, res) =>{
    let restaurants =  await Restaurants.find({}); //finds all documents in MongoDB 
    let amountOfRestaurants = await Restaurants.estimatedDocumentCount();
    let randomNumber = Math.floor(Math.random() * amountOfRestaurants);
    let randomRestaurant = await Restaurants.findOne().skip(randomNumber);
    if(!randomRestaurant){
        randomRestaurant = "";
    }
    
    res.render("index", {data: {items: restaurants, random: randomRestaurant}}); //rendering index.ejs file and passing restaurant data
    console.log("Rendering Index.ejs") //  functionality check
    
})

//add restaurant post route handler
app.post('/addRestaurant', (req, res) =>{
    // resName = req.body.restaurantName.charAt(0).toUpperCase() + req.body.restaurantName.slice(1).toLowerCase();
    // console.log(resName);
    
    //creating Restaurant model instance and adding data from post method to mongodb database
  const resAdd = new Restaurants({
    name: req.body.restaurantName, 
    location: req.body.restaurantLocation, 
    food: req.body.restaurantType,
    website: req.body.restaurantWebsite
  })

  //saving instance to mongo DB then redirecting to page
  
  resAdd.save().then(result => console.log(result.name)).
  then(console.log("added to DB"))
  .catch(err=>console.log(err));


    res.redirect("/");

  
  
})




//Delete route for delete button
app.post("/delete-item", (req, res)=>{
   
    Restaurants.findByIdAndDelete(req.body.deleteBtn, (err, docs)=>
    {
        if(err){
            return err;
        }
        else{
            console.log("Deleted ");
        }
    });
    res.redirect("/");
   
})


