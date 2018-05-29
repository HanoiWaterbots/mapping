let express = require('express');
let router = express.Router();

router.get('/', function (req, res, next) {
    let currentLocation = {
        lat: 21.014083,
        lng: 105.870030
    };
    res.send(currentLocation);
});


module.exports = router;