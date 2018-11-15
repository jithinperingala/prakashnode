var express = require('express')
  , router = express.Router()

router.use('/employee', require('./employees/index'))
router.use('/validateUser', require('./login/index'))
router.use('/site', require('./site/index'))
router.use('/reports', require('./reports/index'))
router.get('/', function(req, res) {
  res.render('index')
})

module.exports = router