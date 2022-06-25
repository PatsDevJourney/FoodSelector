const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodPlace = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String, 
        required: true
    },
    food: {
        type: String, 
        required: true
    }
    
}, {timestamps: true});

const Restaurant = mongoose.model("Restaurant", foodPlace);

module.exports = Restaurant;