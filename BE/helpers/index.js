function loginChecker(req, res, next) {
  if (req.session.authorised) {
    console.log(req.session)
    res.redirect('/');
    return;
  } else {
    next();
    return;
  }
}

function checkForm(fields) {
  for (var i = 0; i < fields.length; i++) {
    var currElement = fields[i];

    if (currElement == undefined || currElement == '') {
      return false;
    }
  }
  return true;
}


module.exports.checkForm = checkForm;

module.exports.loginChecker = loginChecker;