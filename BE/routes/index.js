var express = require('express');
var router = express.Router();
var db = require('../db/db');
var jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const { token } = require('morgan');
const cookieParser = require('cookie-parser');
const cookieEncrypter = require('cookie-encrypter');
var cookies = require("cookie-parser");

const secretKey = "foobarbaz1234567foobarbaz1234567";
 
router.use(cookieParser(secretKey));
router.use(cookieEncrypter(secretKey));
router.use(cookies());

router.get('/', function (req, res, next) {

res.send("<code>Not Found</code>")
});

router.post('/setcookies', function(req, res) {
  const cookieParams = {
    // httpOnly: true,
    // signed: true,
    maxAge: 300000,
  };
  console.log(req.body)
  console.log(req.body.data)
  console.log(req.body.token)
  console.log(req.body.dataE)

  // Set encrypted cookies
  res.cookie('data', req.body.data, {maxAge:30000});
  res.cookie('token', req.body.token, {maxAge:30000});
  res.cookie('data.email', req.body.dataE, {maxAge:30000});
  console.log("qweqwe")
  // res.end('new cookies set');
  console.log('Decrypted cookies:==> ', req)

  
})


// router.get('/resetcookies', function(req, res) {
//   console.log('Decrypted cookies: ', req.signedCookies)
// });




module.exports = router;