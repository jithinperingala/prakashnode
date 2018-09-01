var express = require('express')
    , router = express.Router(),
    db = require('../../database');
pool = db.getPool();

// Define routes handling profile requests
router.post('/', function (req, res, next) {
    console.log("create Employee", req.body)
    var sqlQuery
    if (req.body.createUpdate == "1")
        sqlQuery = 'CALL UpdateEmployee("' + req.body.employee_id + '","' + req.body.empName + '","' + req.body.aadarNumber + '","' + req.body.empType + '","c:/asdd/","' + req.body.address + '","' + req.body.insuranceNumber + '","' + req.body.contactno + '","1")';
    else
        sqlQuery = 'CALL InsertEmployee("' + req.body.empName + '","' + req.body.aadarNumber + '","' + req.body.empType + '","c:/asdd/","' + req.body.address + '","' + req.body.insuranceNumber + '","' + req.body.contactno + '","1")';
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