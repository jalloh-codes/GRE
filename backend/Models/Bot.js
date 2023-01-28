import {Schema, ObjectId, model} from "mongoose";

const BotSchema =  new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        validate:{
            validator: (v)=>{
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        },
    },
    message: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        required: true
    }
})

export const Bot = model('Bot', BotSchema)