const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AirBnB = new Schema({
    lister:{
        type: schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    start_date:{
        type: Date,
        required: true
    },
    end_date:{
        type: Date,
        required: true
    },
    reservation:[
        {type: schema.Types.ObjectId,
        ref: "Reservation"}
    ],
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
            values: ['House', 'Room', 'Apartment'],
            message:"{VALUE} 'House', 'Room', 'Apartment'"
        },
    },
    videos:[
        {type:String}
    ],
    details:{
        studio:{
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
        parking:{
            type: Boolean,
            default: false
        },
        airCondition:{
            type: Boolean,
            default: false
        },
        wifi:{
            type: Boolean,
            default: false
        },
        furnished:{
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
    },
})


module.exports = AirBnB = mongoose.model('AirBnB', AirBnB)