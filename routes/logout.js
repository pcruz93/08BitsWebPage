var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.clearCookie('user');
    res.clearCookie('password');
    res.render('index', { title: '08Bits' });
});

module.exports = router;