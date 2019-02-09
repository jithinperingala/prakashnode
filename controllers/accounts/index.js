var express = require('express')
  , router = express.Router()
router.use('/payments', require('./payment'))
router.use('/pettycashbook', require('./pettycashbook'))
router.use('/bank', require('./bank'))

router.get('/', function (req, res) {
  res.render('index')
})

module.exports = router