var express = require('express')
    , router = express.Router(),
    router = express.Router(),
    db = require('../../database');

// Define routes handling profile requests
router.get('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        // don't forget to check error
        let sql = 'CALL DeleteEmployee("' + req.query.key + '")'
        connection.query(sql, function (err, rows, fields) {
            if (err) throw err

            //   console.log('The solution is: ', rows[0])
            connection.release()
            res.send(rows)
        })
    });


});
module.exports = router