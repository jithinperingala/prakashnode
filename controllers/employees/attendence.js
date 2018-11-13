var express = require('express')
  , router = express.Router(),
  router = express.Router();

// Define routes handling profile requests
router.post('/', function (req, res, next) {
  try {
    var sqlQuery

    sqlQuery = 'CALL InsertAttendance("' + req.body.EmployeeID + '","' + req.body.date + '",' + req.body.status + ',"' + req.body.siteId + '","' + req.body.userId + '")';

    pool.getConnection(function (err, connection) {
      // don't forget to check error

      connection.query(sqlQuery, function (err, rows, fields) {
        if (err) throw err
        connection.release()
        res.send(rows)
      })
    });
  }
  catch (ex) {
    res.send(ex)
  }

})
router.get('/', function (req, res, next) {
  try {
    //console.log("asdsad", req.query.key)
    let sql = 'CALL GetAttandance("' + req.query.siteid + '","' + req.query.fromDate + '","' + req.query.toDate + '")'
    console.log(sql)
    pool.getConnection(function (err, connection) {
      // don't forget to check error
      connection.query(sql, function (err, rows, fields) {
        if (err) throw err

        rows[0].forEach((element, key) => {
          if (element.AttendanceDate)
            element.AttendanceDate = formatDate(element.AttendanceDate)
          if (key == rows[0].length - 1) {
            res.send(rows[0])
          }
        });
        connection.release()

      })
    });
  }
  catch (ex) {
    res.send(ex)
  }

})
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
module.exports = router