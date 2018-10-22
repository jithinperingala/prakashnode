var express = require('express')
  , router = express.Router()
  router.use('/getSiteDetails', require('./getSiteDetails'))
  router.use('/getallocatedEmployes', require('./getAllocationDetails'))

router.get('/', function(req, res) {
    res.render('index')
  })
  
  module.exports = router