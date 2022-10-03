import mongoose from 'mongoose';
const Schema =  mongoose.Schema;

const ReservationSchema = new Schema({
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

export const Reservation = mongoose.model('Reservation', ReservationSchema)