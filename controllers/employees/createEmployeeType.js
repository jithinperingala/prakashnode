var express = require('express')
    , router = express.Router(),
    router = express.Router();

// Define routes handling profile requests
router.post('/',function(req,res,next){
    var sqlQuery
    if (req.body.createUpdate == "1")
        sqlQuery = 'CALL UpdateEmployeeypeType("' + req.body.employee_id + '","' + req.body.empName + '")';
    else
        sqlQuery = 'CALL InsertEmployeetype("' + req.body.empName + '","' + req.body.aadarNumber + '","' + req.body.empType + '")';
   
    pool.getConnection(function (err, connection) {
        // don't forget to check error
       
        connection.query(sqlQuery, function (err, rows, fields) {
            if (err) throw err
            connection.release()
            res.send(rows)
        })
    });
})
module.exports = router