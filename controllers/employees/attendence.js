var express = require('express')
    , router = express.Router(),
    router = express.Router();

// Define routes handling profile requests
router.post('/', function (req, res, next) {
  try{
    var sqlQuery

    sqlQuery = 'CALL InsertAttendance("' + req.body.EmployeeID + '","' + req.body.date + '",' + req.body.status + ',"' + req.body.SiteID + '","' + req.body.userId + '")';
console.log(sqlQuery)
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
router.get('/', function (req, res, next) {
    try{
          //console.log("asdsad", req.query.key)
    let sql = 'CALL GetAttandance("' + req.query.siteid + '","' + req.query.date + '")'
    pool.getConnection(function (err, connection) {
        // don't forget to check error
        connection.query(sql, function (err, rows, fields) {
            if (err) throw err

            // console.log('The solution is: ', rows[0])
            connection.release()
            //connection.release();
            res.send(rows)
        })
    });
    }
    catch(ex){
      res.send(ex)
    }
  
  })
module.exports = router