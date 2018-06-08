let mongoose = require('mongoose');

let waterReadingSchema = new mongoose.Schema({
    lat: {type: Number, required:true},
    lng: {type: Number, required:true},
    pH: {type: Number, enum: {$range: [0, 14, 0.01]}},     //restricting the range of the acceptable input
    Temperature: Number,    
    DO: Number,
    ORP: Number,
    Conductivity: Number
});

let waterReadingModel = mongoose.model('data', waterReadingSchema);

module.exports = waterReadingModel;