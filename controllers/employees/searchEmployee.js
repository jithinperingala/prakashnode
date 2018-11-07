var express = require('express')
    , router = express.Router(),
    router = express.Router(),
    db = require('../../database');

// Define routes handling profile requests
router.get('/', function (req, res, next) {
    console.log("jrp", req.query.key)
    try {
        let sql = 'CALL GetEmployee("' + req.query.key + '")'
        pool.getConnection(function (err, connection) {
            // don't forget to check error
            connection.query(sql, function (err, rows, fields) {
                if (err) {
                    throw err
                }
                else {
                    // console.log('The solution is: ', rows[0])
                    connection.release()
                    //connection.release();
                    res.send(rows)
                }

            })
        });
    }
    catch (ex) {
        res.send(ex)
    }
});
router.get('/empType', function (req, res, next) {
     console.log("asdsad jitihin")
    try {
        let sql = 'CALL SearchEmployee("' + req.query.emptype + '","' + req.query.key.replace(/[^0-9a-z]/gi, '') + '","' + req.query.userID + '")'
        pool.getConnection(function (err, connection) {
            // don't forget to check error
            connection.query(sql, function (err, rows, fields) {
                if (err) { 
                  //  throw err 
                }
                else {
                    //console.log('The solution is: ', rows[0])
                    connection.release()
                    //connection.release();
                    res.send(rows)
                }


            })
            connection.on('error', function(err) {
                console.log("[mysql error]",err);
                res.send(err)
              });
        });
    }
    catch (ex) {
        res.send(ex)
    }



});
module.exports = router