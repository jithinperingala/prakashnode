var express = require('express')
    , router = express.Router(),
    db = require('../../database');
pool = db.getPool();

// Define routes handling profile requests
router.post('/', function (req, res, next) {
   console.log(req.body)
   var  sqlQuery = 'CALL GetUserLogin("' + req.body.userName + '","' + req.body.passCode + '")';
   console.log('The solution is: ', sqlQuery)
    pool.getConnection(function (err, connection) {
        // don't forget to check error
           connection.query(sqlQuery, function (err, result) {
            if (err) throw err
             console.log('The solution is: ', result)
            connection.release()
            res.send(result)
        })
    });


});
module.exports = router