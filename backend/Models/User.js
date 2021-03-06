const mongoose = require('mongoose');
const Roles = require('./Roles')
const schema = mongoose.Schema;

const VerifyRole = async (role) =>{
    console.log(role);
    const roles  =  await Roles.findById({_id: role})

    return roles ? true: false
}


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
    admin:{
        type: Boolean,
        default: false
    },
    roles:[{
            type: schema.Types.ObjectId,
            ref: "Role",
            required: [true, 'Roles is empty'],
            validate:[VerifyRole, 'role not valid']
    }],
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

module.exports = User = mongoose.model('User', UserSchema);