const mongoose = require('mongoose');
const schema = mongoose.Schema;

const HouseSchema =  new schema({
    lister:{
        type: schema.Types.ObjectId,
        ref: "User",
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
    images:[
        {type:String}
    ],
    propertyType:{
        type: String,
        required: [true, 'Empty field'],
        enum: {
            values: ['House', 'Room'],
            message:"{VALUE} 'House', 'Room'"
        },
    },
    videos:[
        {type:String}
    ],
    details:{
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
        parking:{
            type: Boolean,
            default: false
        },
        built:{
            type: String
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

module.exports = House = mongoose.model('House', HouseSchema);