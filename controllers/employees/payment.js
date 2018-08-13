var express = require('express')
    , router = express.Router(),
    db = require('../../database');
pool = db.getPool();

// Define routes handling profile requests
router.post('/', function (req, res, next) {
    console.log("Payment", req.body)
    var sqlQuery
    if (req.body.createUpdate == "1")
        sqlQuery = 'CALL InsertAcounts("' + req.body.fromAccount + '","' + req.body.toAccount + '","' + req.body.amount + '",' + req.body.isclosed + ',"' + req.body.workSite + '","' + req.body.paymentDate + '","' + req.body.remark + '","' + req.body.fromAccount + '")';
    else
        sqlQuery = 'CALL InsertAcounts("' + req.body.fromAccount + '","' + req.body.toAccount + '","' + req.body.amount + '",' + req.body.isclosed + ',"' + req.body.workSite + '","' + req.body.paymentDate + '","' + req.body.remark + '","' + req.body.fromAccount + '")';
    console.log(sqlQuery)
    pool.getConnection(function (err, connection) {
        // don't forget to check error
        //INSERT INTO employee_registration ( `name`, `type`, `aadharNo`) VALUES ("' + req.body.empName + '","' + req.body.empType + '","' + req.body.aadar + '")'
        connection.query(sqlQuery, function (err, result) {
            if (err) throw err
            // console.log('The solution is: ', result)
            connection.release()
            res.send(result)
        })
    });


});
module.exports = router