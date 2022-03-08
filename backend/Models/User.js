const mongoose = require('mongoose');
const schema = mongoose.Schema;

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
    UserType:{
        type: String,
        enum: {
            values: ['BuyOrRent', 'Listing'],
            message:'{VALUE} must be BuyOrRent or Listing'
        },
        required: true
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

module.exports = User = mongoose.model('User', UserSchema);