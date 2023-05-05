var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function (req, res, next) {
  res.send('访问首页')
});

router.post('/login', function (req, res, next) {

  req.session.regenerate(function (err) {
    if (err) next(err)

    // 写入会话信息到session
    req.session.username = req.body.username

    // 保存session
    req.session.save(function (err) {
      if (err) return next(err)
      res.send(req.session.username)
    })
  })
})

// 鉴权中间件
function isAuthenticated(req, res, next) {
  if (req.session.username) next()
  else res.status(401).send()
}

router.get('/userinfo', isAuthenticated, function (req, res, next) {

  // 读取session信息
  res.send(`您的用户名为：${req.session.username}`)

})


module.exports = router;
