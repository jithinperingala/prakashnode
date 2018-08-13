var express = require('express')
  , router = express.Router()
  router.use('/login', require('./validateUser'))

router.get('/', function(req, res) {
    res.render('index')
  })
  
  module.exports = router