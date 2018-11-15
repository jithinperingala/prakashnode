var express = require('express')
  , router = express.Router()
router.use('/attendence', require('./attendence'))
router.get('/', function (req, res) {
  res.render('index')
})

module.exports = router