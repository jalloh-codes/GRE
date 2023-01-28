import {Schema, ObjectId, model} from "mongoose";

const MessageSchema =  new Schema({
    message_to:{
        type: ObjectId,
        ref: "User",
        required: true
    },
    message_from:{
        type: ObjectId,
        ref: "User",
        required: true
    },
    mail:[{
        message:{
            type: String
        },
        created_at:{
            type: Date,
            required: true
        }
    }]
})

export const Message = model('Message', MessageSchema)