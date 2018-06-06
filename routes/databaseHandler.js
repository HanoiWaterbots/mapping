let express = require('express');
let router = express.Router();

/**
 * Handle POST request for incoming data from the hardware.
 *
 * WORK IN PROGRESS: THERE IS NO MONGOOSE SCHEMA YET SO ANY KIND OF DATA
 * IS ALLOWED FOR NOW. AVOID USING THIS FOR NOW
 */
router.post('/data', function (req, res, next) {
    let data = req.body;
    //Send to the database
    let client = req.client;
    if(client){
        const db = client.db('app');
        const collection = db.collection('data');

        try{
            collection.insertOne(data, function (err, r) {
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Data insertion complete:\n\tThe entry inserted is:", r.ops);
                    res.send("success");
                }
            });
        }
        catch (e) {
            console.log(data);
            res.send("Error. Check server logs for details");
        }
    }
});

module.exports = router;