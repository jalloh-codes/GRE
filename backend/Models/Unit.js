const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UnitSchema =  new schema({
    building:{
        type: schema.Types.ObjectId,
        ref: "building",
        required: true
    },
    details:{
        parking: {
            type: Boolean,
            default: false
        },
        length:{
            type: Number,
            required: true
        },
        width:{
            type: Number,
            required: true
        },
        bed:{
            type: Number,
            min: 0,
            required: true
        },
        bath:{
            type: Number,
            min: 0,
            required: true
        },
        price:{
            type: Number,
            required: true
        }
    },
    descriptions:{
        type: String
    },
    active:{
        type: Boolean,
        default: true
    }
    
})

module.exports = Unit = mongoose.model('Unit', UnitSchema);