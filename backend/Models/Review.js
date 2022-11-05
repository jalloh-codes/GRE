import {Schema, ObjectId, model} from "mongoose";

const ReviewSchema =  new Schema({
    lister:{
        type: ObjectId,
        ref: "User",
        required: true
    },
    property:{
        type: ObjectId,
        ref: "AirBnB",
        required: true
    },
    range:{
        type: Number,
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

export const Review = model('Review', ReviewSchema)