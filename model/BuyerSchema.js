const mongoose = require('mongoose');

const BuyerSchema = new mongoose.Schema({
    "name": { type: String },
    "password": { type: String },
    "email": { type: String },
    "mobile": { type: String }
}, {
    collection: "buyerdetails"
});

module.exports = mongoose.model("BuyerSchema", BuyerSchema);
