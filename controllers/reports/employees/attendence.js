var express = require('express')
    , router = express.Router(),
    router = express.Router(),
    db = require('../../../database');

// Define routes handling profile requests
router.get('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        // don't forget to check error
        let sql = 'CALL GetTotalAttendanceBySite("' + req.query.empId + '","' + req.query.fromDate + '","' + req.query.toDate + '")'
        connection.query(sql, function (err, rows, fields) {
            if (err) throw err
            connection.release()
            res.send(rows)
        })
    });


});
router.get('/attendenceByEmployee', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        // don't forget to check error
        let sql = 'CALL GetEmployeeWiseAttandance("' + req.query.empId + '","' + req.query.fromDate + '","' + req.query.toDate + '")'
        connection.query(sql, function (err, rows, fields) {
            if (err) throw err
            connection.release()
            res.send(rows)
        })
    });


});

module.exports = router