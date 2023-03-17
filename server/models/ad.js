import {model, Schema, ObjectId} from 'mongoose';

const schema = new Schema ({
    photos:[{}],
    address: {type: String, maxLength: 255, required: true},
    title: {type: String, maxLength: 255},
    desription: {},
    price: {type: Number, maxLength: 255},
    lotsize: {type: String, maxLength: 255},
    bedrooms: Number,
    bathrooms: Number,
    parking: {type: String, maxLength: 255},
    location: {
        type: {
            type: String,
            enum: ["point"],
            default: "Point",  
        },
        coordinates: {
            type: [Number],
            default: [43.547302, -96.728333],
        }
    },
    slug: {type: String, lowercase: true, unique: true},
    postedBy: {type: ObjectId, ref: "User"},
    sold: {type: Boolean, default: false},
    googleMap: {},
    type: {type: String, default: "Other"},
    action: {type: String, default: "Sell"},
    views: {type: Number, default: 0}
}, { timestamps: true }
);

export default model ("Ad", schema);