var express = require('express')
    , router = express.Router(),
    router = express.Router();

// Define routes handling profile requests
router.get('/', function (req, res, next) {
    try {

        console.log("as", req.query.siteID)
        console.log("as", req.query.searchKey)
        let sql = 'CALL GetEmployeetoAllocate("' + req.query.siteID + '","' + req.query.searchKey.replace(/[^0-9a-z]/gi, '') + '")'
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
        res.send(ex)
    }

});
router.post("/savePayment", function (req, res, next) {
    console.log(req.body.payment.paymentType)

    switch (req.body.payment.paymentType) {
        case "fundTransfer":
            queryString =
                'CALL InsertEmployeeTransactions("' +
                req.body.from.from +
                '","' +
                req.body.to.to +
                '","' +
                req.body.payment.amount +
                '","' +
                req.body.siteId +
                '","' +
                req.body.payment.cachTransferMode +
                '","' +
                req.body.from.fromAccount + '","' +
                req.body.payment.date + '","' +
                req.body.payment.description + '",0)';
            break;
        case "labourPayment":
            break;
        case "contractor":
            queryString =
                'CALL InsertContractorTransactions("' +
                req.body.from.from +
                '","' +
                req.body.to.to +
                '","' +
                req.body.payment.amount +
                '","' +
                req.body.siteId +
                '","' +
                req.body.payment.cachTransferMode +
                '","' +
                req.body.from.fromAccount + '","' +
                req.body.payment.date + '","' +
                req.body.payment.description + '",0)';
            break;
        case "Supplier":
            queryString =
                'CALL InsertSupplierTransactions("' +
                req.body.from.from +
                '","' +
                req.body.to.to +
                '","' +
                req.body.payment.amount +
                '","' +
                req.body.siteId +
                '","' +
                req.body.payment.cachTransferMode +
                '","' +
                req.body.from.fromAccount + '","' +
                req.body.payment.date + '","' +
                req.body.payment.description + '",0)';
            break;
        default:
            throw ("invalid call")

    }

    console.log("bank", queryString);
    try {
        pool.getConnection(function (err, connection) {
            // don't forget to check error

            connection.query(queryString, function (err, rows, fields) {
                if (err) throw err
                connection.release()
                res.send(rows)
            })
        });

    } catch (ex) {
        console.log(ex);
    }
});
router.post("/savepettyCashPayment", function (req, res, next) {
    console.log(req.body.payment)
    queryString =
        'CALL InsertPettyCashTransaction("' +
        req.body.from.from +
        '","' +
        req.body.payment.amount +
        '","' +
        req.body.siteId +
        '","' +
        req.body.payment.cachTransferMode +
        '","' +
        req.body.from.fromAccount + '","' +
        req.body.payment.date + '","' +
        req.body.payment.description + '",0)';

    console.log("bank", queryString);
    try {
        pool.getConnection(function (err, connection) {
            // don't forget to check error

            connection.query(queryString, function (err, rows, fields) {
                if (err) throw err
                connection.release()
                res.send(rows)
            })
        });

    } catch (ex) {
        console.log(ex);
    }
});
module.exports = router