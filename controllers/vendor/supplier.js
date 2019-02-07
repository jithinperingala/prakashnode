var express = require("express"),
  router = express.Router(),
  router = express.Router();

// Define routes handling profile requests
router.get("/", function(req, res, next) {
  try {
    console.log("as", req.query.siteID);
    console.log("as", req.query.searchKey);
    let sql =
      'CALL GetEmployeetoAllocate("' +
      req.query.siteID +
      '","' +
      req.query.searchKey.replace(/[^0-9a-z]/gi, "") +
      '")';
    pool.getConnection(function(err, connection) {
      // don't forget to check error

      connection.query(sql, function(err, rows, fields) {
        if (err) throw err;

        console.log("The solution is: ", rows[0].solution);
        connection.release();

        res.send(rows);
      });
    });
  } catch (ex) {
    res.send(ex);
  }
});
router.post("/", function(req, res, next) {
  try {
    console.log("bdy", req.body);
    var sqlQuery;
    if (req.body.createUpdate == "1")
      sqlQuery =
        'CALL UpdateSupplier("' +
        req.body.employee_id +
        '","' +
        req.body.empName +
        '","' +
        req.body.aadarNumber +
        '","' +
        req.body.empType +
        '","' +
        "asdasd" +
        '","' +
        req.body.address +
        '","' +
        req.body.insuranceNumber +
        '","' +
        req.body.contactno +
        '","' +
        req.body.email +
        '","' +
        req.body.officialNumber +
        '","' +
        req.body.dob +
        '","' +
        req.body.gender +
        '","' +
        req.body.contactPerson +
        '","' +
        req.body.contactPersonMobile +
        '","' +
        req.body.contactPesonRelation +
        '","1","' +
        req.body.wagesType +
        '","' +
        req.body.salaryAmount +
        '","A+")';
    else
      sqlQuery =
        'CALL InsertSupplier("' +
        req.body.empName +
        '",1,"' +
        req.body.aadarNumber +
        '","' +
        req.body.empType +
        '","' +
        "asdasd" +
        '","' +
        req.body.address +
        '","' +
        req.body.insuranceNumber +
        '","' +
        req.body.contactno +
        '","' +
        req.body.email +
        '","' +
        req.body.officialNumber +
        '","' +
        req.body.dob +
        '","' +
        req.body.gender +
        '","' +
        req.body.contactPerson +
        '","' +
        req.body.contactPersonMobile +
        '","' +
        req.body.contactPesonRelation +
        '","1","' +
        req.body.wagesType +
        '","' +
        req.body.salaryAmount +
        '","0+")';
    console.log(sqlQuery);
    pool.getConnection(function(err, connection) {
      connection.query(sqlQuery, function(err, result) {
        if (err) throw err;
        connection.release();
        res.send(result);
      });
    });
  } catch (ex) {
    console.log(ex);
  }
});
module.exports = router;
