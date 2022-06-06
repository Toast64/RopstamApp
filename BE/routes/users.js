var express = require('express');
var jwt = require("jsonwebtoken");
var router = express.Router();
var db = require('../db/db');
var helpers = require('../helpers');
var errors = [];
const secretKey = require("../config/config.secretKey").secretKey
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jade = require('jade');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);


// function responsible for sending emails. You can put your mailer info in the .env file and you will be able to send emails using nodemailer
const sendEmail = async (email, username, password) => {

  // template for the email is taken from a jade file in the templates folder
  let html = await readFile("templates/newEmail.jade", 'utf8');
  let template = jade.compile(html);

  // console.log(password)
  let data = {
    username,
    password
  }
  let emailTemplate = template(data);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  })

  var mailOptions = {
    from: '"AbdalTesting" <noreply@email.com>',
    to: email,
    subject: 'New Account Password',
    html: emailTemplate
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.messageId);
    }
  })
}

// for creating new users 
router.post('/register', helpers.loginChecker, async (req, res, next) => {
  // random 4 digit number which will be emailed to used when creating an account
  var val = Math.floor(1000 + Math.random() * 9000);
  val = val.toString();

  // password hashing to be stored in the database
  const salt = await bcrypt.genSalt(10);
  const encpassword = await bcrypt.hash(val, salt);
  sendEmail(req.body.email, req.body.username, val)


  TOKEN = process.env.SECRET_KEY || secretKey
  // a jwt token created alongside the user's data
  const token = jwt.sign({ email: req.body.email, password: val }, TOKEN)
  var sqlQuery = `INSERT INTO users(email, password, username, token) VALUES(?, ?, ?, ?)`;
  var values = [req.body.email, encpassword, req.body.username, token];
  db.query(sqlQuery, values, function (err, results, fields) {
    // console.log("VALUES", values);
    if (err) {
      errors.push(err.message);
      next();
      return;
    }
  });
}, (req, res) => {
  res.statusCode = 401;
  res.render('register', {
    title: 'Register',
    messages: errors
  });
  errors = [];
});


router.get('/login', helpers.loginChecker, (req, res, next) => {
  res.render('login', {
    title: 'Login'
  });
});

// for loging in users
router.post('/login', async (req, res, next) => {
  if (!helpers.checkForm([req.body.email, req.body.password])) {
    errors.push('Please fill in all fields!');
    next();
    return;
  }
  var sqlQuery = `SELECT * FROM users WHERE email = ?`;
  var values = [req.body.email];
  db.query(sqlQuery, values, async (err, results, fields) => {
    if (err) {
      errors.push(err.message);
      next();
      return;
    }
    if (results.length) {
      let correctPassword = await bcrypt.compare(req.body.password, results[0].password);
      if (correctPassword) {
        console.log("qweqwe", process.env.SECRET_KEY)
        jwt.sign(
          { email: req.body.email, password: req.body.password },
          process.env.SECRET_KEY,
          (err, token) => {
            if (err) { console.log(err) }
            console.log(token)
            res.send({
              "token": token,
              "authStatus": 1
            })
          });
        return;
      }
    }
    else {
      console.log("wrong password")
      errors.push('The username or password is incorrect.');
      res.send({
        "authStatus": 2
      })

      next();
    }
  });
});

/* GET Method users Page.. Displaying values from the database */
router.get('/users/show', function (req, res, next) {
  var sql = 'SELECT * FROM users';
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json(data);
  });
});

router.post('/login', function (req, res, next) {
  res.statusCode = 401;
  res.render('login', {
    title: 'Login',
    messages: errors
  });
  errors = [];
});





router.get('/exit', function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
  // resetSession()
});
module.exports = router;



