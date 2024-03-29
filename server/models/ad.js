import {model, Schema, ObjectId} from 'mongoose';

const schema = new Schema ({
    photos:[{}],
    address: {type: String, maxLength: 255, required: true},
    title: {type: String, maxLength: 255},
    desription: {},
    price: {type: Number, maxLength: 255},
    lotsize: {type: String},
    bedrooms: Number,
    bathrooms: Number,
    parking: {type: String, maxLength: 255},
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",  
        },
        coordinates: {
            type: [Number],
            default: [-96.728333, 43.547302], //longitude & Latitude
        }
    },
    slug: {type: String, lowercase: true, unique: true},
    postedBy: {type: ObjectId, ref: "User"},
    sold: {type: Boolean, default: false},
    googleMap: {},
    type: {type: String, default: "Other"}, //House, Land, Apartment, Commercial
    action: {type: String, default: "Sell"}, //Sell or Rent
    views: {type: Number, default: 0}
}, { timestamps: true }
);

export default model ("Ad", schema);