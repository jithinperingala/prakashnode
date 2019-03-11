var express = require('express')
    , router = express.Router(),
    router = express.Router(),
    db = require('../../../database');

// Define routes handling profile requests
router.get('/getContractorAccounts', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        // don't forget to check error
        let sql = 'CALL GetAllContractorTransactions()'
        connection.query(sql, function (err, rows, fields) {
            if (err) throw err
            connection.release()
            res.send(rows)
        })
    });


});

router.get('/getSupplierAccounts', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        // don't forget to check error
        let sql = 'CALL GetAllSupplierTransactions()'
        connection.query(sql, function (err, rows, fields) {
            if (err) throw err
            connection.release()
            res.send(rows)
        })
    });


});


module.exports = router