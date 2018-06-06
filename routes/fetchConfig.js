let express = require('express');
let router = express.Router();
let CONFIG = require('../config');

/**
 * Send map key to the user-end application
 */
router.get('/mapKey', function (req, res, next) {
    res.send({
        "key": CONFIG.MAP_KEY
    });
});

module.exports = router;
