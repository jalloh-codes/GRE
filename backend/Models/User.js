import  mongoose from 'mongoose';
const schema = mongoose.Schema;
import {AllowRoles} from '../Config/AllowRoles.js'

const UserSchema =  new schema({
    firstname:{
        type: String,
        required: [true, 'Firstname is not provided'],
        lowercase: true,
        validate: {
            validator: (v)=>{
                return /^(?!\s*$).+/.test(v)
            },
            message: '{VALUE} is empty'
        },
        minlength: 3
    },
    lastname:{
        type: String,
        required: [true, 'Lastname is not provided'],
        lowercase: true,
        validate: {
            validator: (v)=>{
                return /^(?!\s*$).+/.test(v)
            },
            message: '{VALUE} is empty'
        },
        minlength: 3,

    },
    email:{
        type: String,
        required: [true, "Email is not provided"],
        unique: [true, "Email already exists"],
        trim: true,
        lowercase: true,
        validate:{
            validator: (v)=>{
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        },
    },
    password:{
        type: String,
        required: true,
        hide: true
    },
    role:{
        type: Number,
        enum: {
            values: Object.values(AllowRoles),
            message:'{VALUE} not accepted.'
        },
        required: true
    },
    verified:{
        type: Boolean,
        default: false
    },
    phoneNumber:{
        type: String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    }
})

export const  User = mongoose.model('User', UserSchema);