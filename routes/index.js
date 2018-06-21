var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(null);
});

//router.post('/team', function(req, res, next){
//    res.send('About the team');
//})

module.exports = router;
