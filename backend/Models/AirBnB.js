import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const schemaAirBnB = new Schema({
    lister:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name:{
        type: String
    },
    reservation:[
        {type: Schema.Types.ObjectId,
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


export const AirBnB = mongoose.model('AirBnB', schemaAirBnB)



// images: [
//     {
//         url: String,
//         public_id: String
//     }
// ],

// availability: [
//     {
//         from: String,
//         to:	  String
//     }
// ],