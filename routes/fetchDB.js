let express = require('express');
let router = express.Router();

/**
 * Dummy data. Look at this to understand the schema
 * @type {{data: *[]}}
 */
let data = {
    data: [
            {
                lat: 21.066975,
                lng: 105.851491,
                pH: Math.random()*14,
                Temperature: Math.random()*20,
                'Dissolved Oxygen': Math.random()*20,
                ORP: Math.random()*20,
                Conductivity: Math.random()*20,
            },
            {
                lat: 21.048051,
                lng: 105.859044,
                pH: Math.random()*14,
                Temperature: Math.random()*20,
                'Dissolved Oxygen': Math.random()*20,
                ORP: Math.random()*20,
                Conductivity: Math.random()*20,
            },
            {
                lat: 21.025621,
                lng: 105.865224,pH: Math.random()*14,
                Temperature: Math.random()*20,
                'Dissolved Oxygen': Math.random()*20,
                ORP: Math.random()*20,
                Conductivity: Math.random()*20,
            },
            {
                lat: 21.014083,
                lng: 105.870030,
                pH: Math.random()*14,
                Temperature: Math.random()*20,
                'Dissolved Oxygen': Math.random()*20,
                ORP: Math.random()*20,
                Conductivity: Math.random()*20,
            }
    ]
};

/**
 * GET request to fetch the data from the database
 */
router.get('/', function (req, res, next) {
    if(req.client){
        res.send(data);
    }
});

module.exports = router;