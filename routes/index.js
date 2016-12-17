var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var ua = req.get('User-Agent');
  var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  var webkit = !!ua.match(/WebKit/i);
  var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
  res.render('index', {useAppCache: iOSSafari});
});

module.exports = router;
