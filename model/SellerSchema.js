const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
    "name": { type: String },
    "password": { type: String },
    "email": { type: String },
    "mobile": { type: String },
    "property": [{
        "propertyType":{type:String},
        "location": { type: String },
        "budget": { type: Number },
        "image":{type:String}
    }]
}, {
    collection: "logindetails"
});

module.exports = mongoose.model("SellerSchema", SellerSchema);
