var express = require('express')
    , router = express.Router(),
    router = express.Router();

// Define routes handling profile requests
router.get('/fromUser', function (req, res, next) {
    try {
        let sql = 'CALL GetFromUsers("' + req.query.id + '")'
        pool.getConnection(function (err, connection) {
            // don't forget to check error

            connection.query(sql, function (err, rows, fields) {
                if (err) throw err

                console.log('The solution is: ', rows[0].solution)
                connection.release()

                res.send(rows)
            })

        });
    }
    catch (ex) {
        res.send(ex)
    }

});
router.get('/toUser', function (req, res, next) {
    try {
        let sql = 'CALL GetToUsers("' + req.query.id + '","' + req.query.catogery + '")'
        pool.getConnection(function (err, connection) {
            // don't forget to check error

            connection.query(sql, function (err, rows, fields) {
                if (err) {
                    next();
                    throw err
                }

                console.log('The solution is: ', rows[0].solution)
                connection.release()
                next();
                res.send(rows)
            })

        });
    }
    catch (ex) {
        // res.send(ex)
        next();
    }

});
module.exports = router