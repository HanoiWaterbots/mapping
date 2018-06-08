let express = require('express');
let router = express.Router();
let Data = require('../models/createSchema');

/**
 * Handle POST request for incoming data from the hardware.
 *
 * WORK IN PROGRESS: THERE IS NO MONGOOSE SCHEMA YET SO ANY KIND OF DATA
 * IS ALLOWED FOR NOW. AVOID USING THIS FOR NOW
 */
router.post('/data', function (req, res, next) {
    let data = req.body;
    //Send to the database
    Data.create({
        lat: data.lat,
        lng: data.lng,
        pH: data.pH,     //restricting the range of the acceptable input
        Temperature: data.Temperature,
        DO: data.DO,
        ORP: data.ORP,
        Conductivity: data.Conductivity
    }, function (err, entry) {
        if(err){
            console.log("There was an error completing the request");
            res.status(err.status || 500);
            res.send("Error. Look at server logs for details.")
        }
        else{
            console.log(entry);
            res.status(200);
            res.send("Done");
        }
    });
});

module.exports = router;