var express = require('express')
  , router = express.Router()

router.use('/createUpdateEmployee', require('./createEmployee'))
router.use('/getAllEmployee', require('./searchEmployee'))
router.use('/deleteEmployee', require('./deleteEmployee'))


router.use('/getEmployeeType', require('./searchEmployeeType'))
router.use('/createUpdateEmployeeType', require('./createEmployeeType'))
router.use('/deleteEmployeeType', require('./deleteEmployeeType'))

router.use('/payment', require('./payment'))
router.use('/paymentReport', require('./paymentReport'))
router.get('/', function(req, res) {
  res.render('index')
})

module.exports = router