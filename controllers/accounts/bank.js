var express = require("express"),
  router = express.Router(),
  router = express.Router();

// Define routes handling profile requests
router.get("/", function (req, res, next) {
  try {
    console.log("as", req.query.siteID);
    console.log("as", req.query.searchKey);
    let sql =
      'CALL GetEmployeetoAllocate("' +
      req.query.siteID +
      '","' +
      req.query.searchKey.replace(/[^0-9a-z]/gi, "") +
      '")';
    pool.getConnection(function (err, connection) {
      // don't forget to check error

      connection.query(sql, function (err, rows, fields) {
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
router.post("/", function (req, res, next) {
  console.log("bank", req.body);
  try {
    console.log("bdy", req.body);

    for (var i = 0; i < req.body.data.length; i++) {
      var sqlQuery;
      if (req.body.createUpdate == "1")
        sqlQuery =
          'CALL InsertBankAccounts("' +
          req.body.id +
          '","' +
          req.body.code +
          '","' +
          req.body.data[i].name +
          '","' +
          req.body.data[i].branch +
          '","' +
          req.body.data[i].ifsc +
          '","' +
          req.body.data[i].accNo +
          '",0)';
      else
        sqlQuery =
          'CALL InsertContractor("' +
          req.body.id +
          '","' +
          req.body.code +
          '","' +
          req.body.data[i].name +
          '","' +
          req.body.data[i].branch +
          '","' +
          req.body.data[i].ifsc +
          '","' +
          req.body.data[i].accNo +
          '",0)';
      console.log(sqlQuery);
      pool.getConnection(function (err, connection) {
        connection.query(sqlQuery, function (err, result) {
          if (err) throw err;
          connection.release();
          if (i == req.body.data.length - 1) {
            res.send(result);
          }

        });
      });
    }

  } catch (ex) {
    console.log(ex);
  }
});
module.exports = router;
