var express = require('express')
  , router = express.Router()
router.use('/employees', require('./employees/index'))
router.get('/', function (req, res) {
  res.render('index')
})

module.exports = router