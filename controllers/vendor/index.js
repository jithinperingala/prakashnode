var express = require('express')
  , router = express.Router()
router.use('/contractor', require('./contractor'))
router.use('/supplier', require('./supplier'))

router.get('/', function (req, res) {
  res.render('index')
})

module.exports = router