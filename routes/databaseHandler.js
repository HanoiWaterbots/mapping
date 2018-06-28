let express = require('express');
let router = express.Router();
let Data = require('../models/createSchema');

/**
 * Handle POST request for incoming data from the hardware.
 *
 */
router.post('/data', function (req, res, next) {
    let data = req.body;
    let io = res.io;
    //Send to the database
    Data.create({
        lat: data.lat,
        lng: data.lng,
        pH: data.pH,     //restricting the range of the acceptable input
        Temperature: data.Temperature,
        DO: data.DO,
        ORP: data.ORP,
        Conductivity: data.Conductivity,
        Cu: data.Cu,
        Pb: data.Pb,
        timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta'})
    }, function (err, entry) {
        if(err){
            res.status(err.status || 500);
            console.log(err);
            res.send(err);
        }
        else{
            console.log("REQUEST TO ADD THE DOCUMENT:", entry);
            io.emit('updateData', entry);
            res.status(200);
            res.send(entry);
        }
    });
});

module.exports = router;