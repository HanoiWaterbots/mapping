

let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let CONFIG = require('./config');

let ATLAS_API_KEY=CONFIG.DB_KEY;
let ATLAS_API_USER=CONFIG.DB_USER;
let ATLAS_API_URL=CONFIG.DB_URL;
let ATLAS_URL = "mongodb+srv://" + ATLAS_API_USER +":" + ATLAS_API_KEY + ATLAS_API_URL;

//connecting the mongoose object to the mongoDB database
mongoose.connect(ATLAS_URL);

 var waterReadingSchema = new mongoose.Schema({
    lat: Number,
    lng: Number,
    pH: {type: Number, enum: {$range: [0, 14, 0.01]}},     //restricting the range of the acceptable input
    Temperature: Number,    
    'Dissolved Oxygen': Number,
    ORP: Number,
    Conductivity: Number
});

var waterReadingModel = mongoose.model('waterReadingModel', waterReadingSchema);  
/*
router.post('/addReading', function (req,res, nest){
   //creating schema
    var newReading = waterReadingModel(req.body).save(function(err,data){
        if(err){
            console.log(err);
        }
        else{
            console.log("Reading added to database.");
            res.json(data);
        }
    });

});
    
*/


module.exports = router;