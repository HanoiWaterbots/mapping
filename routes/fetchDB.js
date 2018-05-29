let express = require('express');
let router = express.Router();
let db = require('mongodb').MongoClient;

let url = "";
let dbname = "";

let data = {
    data: [
            {
                lat: 21.066975,
                lng: 105.851491,
                wt: 1
            },
            {
                lat: 21.048051,
                lng: 105.859044,
                wt: 50
            },
            {
                lat: 21.025621,
                lng: 105.865224,
                wt: 1000
            },
            {
                lat: 21.014083,
                lng: 105.870030,
                wt: 1000
            }
    ]
};

router.get('/', function (req, res, next) {
    res.send(data);
});

module.exports = router;