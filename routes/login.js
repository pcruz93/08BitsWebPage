var express = require('express');
var cookieParser = require('cookie-parser')
var router = express.Router();

router.use(cookieParser())

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: '08Bits' });
});

router.post('/submit', function(req, res, next) {
    console.log(req.body.email);
    console.log(req.body.password);
    res.cookie('email', req.body.email, {maxAge : 9999});
    res.cookie('password', req.body.password, {maxAge : 9999});
    res.send('done');
});

module.exports = router;