var express = require('express')
    , router = express.Router(),
    router = express.Router();

// Define routes handling profile requests
router.get('/', function (req, res, next) {
   // console.log("asdsad", req.query.key)
   console.log("as",req.query.siteID)
   console.log("as",req.query.searchKey)
    let sql = 'CALL GetEmployeetoAllocate("' + req.query.siteID + '","' + req.query.searchKey + '")'
    pool.getConnection(function (err, connection) {
        // don't forget to check error
        connection.query(sql, function (err, rows, fields) {
            if (err) throw err
           
            // console.log('The solution is: ', rows[0].solution)
            connection.release()
            console.log(rows)
            //connection.release();
            res.send(rows)
        })
    });
});
module.exports = router