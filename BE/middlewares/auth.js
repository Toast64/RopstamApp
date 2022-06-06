const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];
  console.log("qwe", header)
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];
    req.token = token;
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authdata) => {
      if (err) {
        console.log(err)
      } else {
        console.log(authdata)
        next();
      }

    })

  } else {
    res.sendStatus(403)
  }
}

const verifyResetPasswordToken = (token) => {
  var returnValue = false
  console.log("token", token)
  try {
    jwt.verify(token, process.env.RESET_ACCOUNT_SECRET_KEY, (err, authdata) => {
      if (err) {
        console.log("error==>", err)
        returnValue = "error"
      } else {
        returnValue = authdata
        console.log("return value", returnValue)
      }
    })
  } catch {
    console.log("pass")
  }
  console.log("here 3")

  return returnValue


}


module.exports.verifyToken = verifyToken
module.exports.verifyResetPasswordToken = verifyResetPasswordToken
