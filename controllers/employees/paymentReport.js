var express = require('express')
    , router = express.Router(),
    router = express.Router(),
    db = require('../../database');

// Define routes handling profile requests
router.get('/', function (req, res, next) {
   // console.log("asdsad", req.query.key)
    let sql = 'CALL GetAccountByEmployee("' + req.query.key + '")'
    pool.getConnection(function (err, connection) {
        // don't forget to check error
        connection.query(sql, function (err, rows, fields) {
            if (err) throw err

            // console.log('The solution is: ', rows[0].solution)
            connection.release()
            //connection.release();
            res.send(rows)
        })
    });
});
module.exports = router