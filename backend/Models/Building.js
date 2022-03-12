const mongoose = require('mongoose');
const schema = mongoose.Schema;

const BuildingSchema =  new schema({
    name:{
        type: String
    },
    propertyType:{
        type: String,
        required: [true, 'Empty field'],
        enum: {
            values: ['Apartments', 'Hotel'],
            message:"{VALUE} 'building', 'room'"
        },
    },
    lister:{
        type: schema.Types.ObjectId,
        ref: "Lister",
        required: true
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
    units:[{
        type: schema.Types.ObjectId,
        ref: 'unit',
    }],
    details:{
        parking:{
            type: Boolean,
            default: false,
        },
        built:{
            type: String
        },
    }
    
})

module.exports = Building = mongoose.model('Building', BuildingSchema);