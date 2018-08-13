var express = require('express')
  , router = express.Router()
  router.use('/getSiteDetails', require('./getSiteDetails'))

router.get('/', function(req, res) {
    res.render('index')
  })
  
  module.exports = router