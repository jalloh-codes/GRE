const mongoose = require("mongoose");
const Schema =  mongoose.Schema

const Review =  new Schema({
    lister:{
        type: schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    property:{
        type: schema.Types.ObjectId,
        ref: "AirBnB",
        required: true
    },
    range:{
        type: Int,
        min: 0,
        max: 5,
        required: true
    },
    statement:{
        type: String
    },
    created_at:{
        type: Date,
        required: true
    }
})

module.exports = Review = mongoose.Schema('Review', Review)