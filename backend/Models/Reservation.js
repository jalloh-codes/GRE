const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const Reservation = new Schema({
    lister:{
        type: schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    airbnb:{
        type: schema.Types.ObjectId,
        ref: "AirBnB",
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
    price:{
        type: Float,
        required: true
    },
    update_at:{
        type: Date,
        required: true
    }
})

module.exports = Reservation = mongoose.model('Reservation', Reservation)