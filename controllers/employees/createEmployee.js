var express = require('express')
    , router = express.Router(),
    db = require('../../database');
pool = db.getPool();
var multer = require('multer');
var DIR
var storage;
var upload;
// var upload = multer({dest: DIR}).single('photo');



// Define routes handling profile requests
router.post('/', function (req, res, next) {
    try {


        console.log("create Employee", req.body)
        var sqlQuery
        if (req.body.createUpdate == "1")
            sqlQuery = 'CALL UpdateEmployee("' + req.body.employee_id + '","' + req.body.empName + '","' + req.body.aadarNumber + '","' + req.body.empType + '","' + "asdasd" + '","' + req.body.address + '","' + req.body.insuranceNumber + '","' + req.body.contactno + '","' + req.body.email + '","' + req.body.officialNumber + '","' + req.body.dob + '","' + req.body.gender + '","' + req.body.contactPerson + '","' + req.body.contactPersonMobile + '","' + req.body.contactPesonRelation + '","1","' + req.body.wagesType + '","' + req.body.salaryAmount + '","A+")';
        else
            sqlQuery = 'CALL InsertEmployee("' + req.body.empName + '",1,"' + req.body.aadarNumber + '","' + req.body.empType + '","' + "asdasd" + '","' + req.body.address + '","' + req.body.insuranceNumber + '","' + req.body.contactno + '","' + req.body.email + '","' + req.body.officialNumber + '","' + req.body.dob + '","' + req.body.gender + '","' + req.body.contactPerson + '","' + req.body.contactPersonMobile + '","' + req.body.contactPesonRelation + '","1","' + req.body.wagesType + '","' + req.body.salaryAmount + '","0+")';
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
    }
    catch (ex) {
        console.log(ex)
    }

});
router.post('/photoUpload', function (req, res, next) {
    var path = '';
    DIR = './uploads/photo';
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, DIR)
        },
        filename: function (req, file, cb) {
            cb(null, req.body.empid.toString().split(',')[0])
        }
    })

    upload = multer({ storage: storage }).single('photo')

    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            console.log(err);
            return res.status(422).send("an Error occured")
        }
        console.log(req.body.empid.toString().split(',')[0])
        path = req.file.path;
        return res.send("Upload Completed for " + path);
    });
})
router.post('/insuranceUpload', function (req, res, next) {
    var path = '';
    DIR = './uploads/insurance';
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, DIR)
        },
        filename: function (req, file, cb) {
            cb(null, req.body.empid.toString().split(',')[0])
        }
    })

    upload = multer({ storage: storage }).single('photo')

    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            console.log(err);
            return res.status(422).send("an Error occured")
        }
        console.log(req.body.empid.toString().split(',')[0])
        path = req.file.path;
        return res.send("Upload Completed for " + path);
    });
})
router.post('/aadarUpload', function (req, res, next) {
    var path = '';
    DIR = './uploads/aadar';
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, DIR)
        },
        filename: function (req, file, cb) {
            cb(null, req.body.empid.toString().split(',')[0])
        }
    })

    upload = multer({ storage: storage }).single('photo')

    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            console.log(err);
            return res.status(422).send("an Error occured")
        }
        console.log(req.body.empid.toString().split(',')[0])
        path = req.file.path;
        return res.send("Upload Completed for " + path);
    });
})
module.exports = router