const mongoose = require('mongoose');
const schema = mongoose.Schema;
const {functionality} =  require('../Config/functionality')

const RolesSchema =  new schema({
    name:{
        type: String,
        required: [true, '{Role} name is empty'],
        unique: true,
        enum: {
            values: functionality,
            message:`{VALUE} must be ${functionality}`
        },
    },
    created:{
        type: Date,
        default: Date.now
    }
})

// module.exports = Roles = mongoose.model('Role', RolesSchema);