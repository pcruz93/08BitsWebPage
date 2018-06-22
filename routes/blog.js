var express = require('express');
var bodyParser = require('body-parser');
var Realm = require('realm');
var router = express.Router();

let PostSchema = {
    name: 'Post',
    properties: {
      timestamp: 'date',
      title: 'string',
      content: 'string'
    }
  };
  
  var blogRealm = new Realm({
    path: 'blog.realm',
    schema: [PostSchema]
  });
  
router.use(bodyParser.urlencoded({extended: true}));

/* GET blog page. */
router.get('/', function(req, res) {
  let posts = blogRealm.objects('Post').sorted('timestamp', true);
  res.render('blog', {posts: posts});
});

router.get('/write', function(req, res, next) {
  let posts = blogRealm.objects('Post').sorted('timestamp', true);
  res.render('write', {posts: posts});
});

router.post('/submit', function(req, res) {
  let title = req.body['title'],
    content = req.body['content'],
    timestamp = new Date();
  blogRealm.write(() => {
    blogRealm.create('Post', {title: title, content: content, timestamp: timestamp});
  });
  res.render('write-complete');
});

module.exports = router;