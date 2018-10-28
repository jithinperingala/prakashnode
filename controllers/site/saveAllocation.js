var express = require('express')
    , router = express.Router(),
    router = express.Router();

// Define routes handling profile requests
router.post('/',function(req,res,next){
    try{
        var sqlQuery = 'CALL InsertEmployeeAllocation("' + req.body.selectedSite + '","' + req.body.employeeID + '","' + req.body.allocatedDate + '","' + req.body.userId + '")';

        pool.getConnection(function (err, connection) {
            // don't forget to check error
           
            connection.query(sqlQuery, function (err, rows, fields) {
                if (err) throw err
                connection.release()
                res.send(rows)
            })
        });
    }
   catch(ex){
    res.send(ex)
   }
})
module.exports = router