let express = require('express');
let router = express.Router();

/**
 * Get the current location from the hardware
 */
router.get('/', function (req, res, next) {
    /**
     * Dummy data.
     * HAVE A LOOK AT THIS TO UNDERSTAND THE SCHEMA
     * @type {{lat: number, lng: number}}   Location data object
     */
    let currentLocation = {
        lat: 21.014083,
        lng: 105.870030
    };
    res.send(currentLocation);
});


module.exports = router;