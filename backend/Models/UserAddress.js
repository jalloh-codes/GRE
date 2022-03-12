const mongoose = require('mongoose');
const schema = mongoose.Schema;

const AddressSchema =  new schema({
    owner:{
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    loc:{
        region:{
            type: String,
            required: true
        },
        lat:{
            type: Number,
            required: [true, 'Empty field']
        },
        lng:{
            type: Number,
            required: [true, 'Empty field']
        }
    },
})

module.exports = UserAddress = mongoose.model('UserAddress', AddressSchema);