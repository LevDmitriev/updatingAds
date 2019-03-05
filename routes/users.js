/** @type {createApplication} */
let express = require('express');
/** @type {Router} */
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
