let express = require('express');
let router = express.Router();
let Data = require('../models/createSchema');
/**
 * GET request to fetch the data from the database
 */
router.get('/', function (req, res, next) {
    Data.find({}, function (err, data) {
        if(err){
            res.status(500);
            res.send(err);
        }
        else{
            console.log(data);
            res.status(200);
            res.send(data);
        }
    });
});

module.exports = router;