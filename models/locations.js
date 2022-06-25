const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodLocation = new Schema({
    address: {
        type: String,
        required: true
    },
    city: {
        type: String, 
        required: true
    },
    state: {
        type: String, 
        required: true
    }
    
}, {timestamps: true});

const Locations = mongoose.model("Location", foodLocation);

module.exports = Locations;