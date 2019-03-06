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
    pool.getConnection(function (err, connection) {
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
        console.log(sqlQuery);

        connection.query(sqlQuery, function (err, result) {
          if (err) throw err;
          console.log("i", i)
          console.log("length", req.body.data.length)
          console.log("i===1", i == req.body.data.length - 1)
          if (i == req.body.data.length - 1) {
            console.log("reached end")
            connection.release();
            res.send(result);
          }

        });

      }
    });
  } catch (ex) {
    console.log(ex);
  }
});
router.get('/bankAccountDetails', function (req, res, next) {
  try {

    let sql = 'CALL GetBankAccountDetais("' + req.query.id + '","' + req.query.catogery + '")'
    console.log(sql)
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
    next()
    res.send(ex)
  }

});
module.exports = router;
