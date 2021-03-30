const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(path.join(path.relative(__dirname, 'uploads')));
  console.log(process.env.PWD);
  res.render('index', { title: 'Express' });
});

module.exports = router;
