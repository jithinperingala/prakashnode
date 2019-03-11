var express = require('express')
  , router = express.Router()
router.use('/payment', require('./payment'))
router.use('/vendor', require('./vendor'))
router.get('/', function (req, res) {
  res.render('index')
})

module.exports = router