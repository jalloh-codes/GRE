import mongoose from 'mongoose';
const Schema = mongoose.Schema

const VerifySchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        unique: true,
    },
    code: {
        type: String,
        required : true,
        hide: true
    },
    createdAt:{
        type: Date,
        default: new Date(),
    },
    expireAt:{
        type: Date,
        default: new Date(),
        expires: 1000
    }
})

export const Verify = mongoose.model('Verify', VerifySchema)