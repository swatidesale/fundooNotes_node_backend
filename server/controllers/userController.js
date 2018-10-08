const userServices = require('../services/userServices');

function isEmail(email) {
    if (email.match(/^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/)) 
        return true;
    else 
        return false;
}

function checkPasswordLength(password) {
    if((password.length) >= 8)
        return true;
    else 
        return false;
}

// function isPasswordMatch(password, confirmPassword) {
//     if(password === confirmPassword) 
//         return true;
//     else 
//         return false;
// }

function isPasswordSameAsUsername(username, password) {
    if(username === password) 
        return false;
    else
        return true;
}

function isContainLowerLetter(password) {
    pattern = /[a-z]/;
    if(password.match(pattern))
        return true;
    else    
        return false;
}

function isContainUpperLatter(password) {
    pattern = /[A-Z]/;
    if(password.match(pattern))
        return true;
    else 
        return false;
}

function isContainNumber(password) {
    pattern = /[0-9]/;
    if(password.match(pattern))
        return true;
    else 
        return false;
}

// function isContainSpecialCharacter(password) {
//     if(password.match('!') || password.match('~') || password.match('@') || password.match('#') || password.match('$') || password.match('&') || password.match('*'))
//         return true;
//     else 
//         return false;
// }

exports.signUp = function(req, res) {
    req.checkBody('firstname','firstname is required').notEmpty();
    req.checkBody('lastname','lastname is required').notEmpty();
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('password','password is required').notEmpty();
    req.checkBody('confirmPassword','confirmPassword is required').notEmpty();

    var userData = req.body;
    var errors = req.validationErrors();
    if (errors) {
        res.send({success: false, msg: errors});
    }
    else if(!isEmail(userData.username)) {
        res.send({success: false, msg: 'Invalid Email Address.'});
    } 
    else if(!isPasswordSameAsUsername(userData.username, userData.password)) {
        res.send({success: false, msg: 'Password must be different from Username!'});
    }
    else if(!checkPasswordLength(userData.password)) {
        res.send({success: false, msg: 'Password must contain at least eight characters!'});
    } 
    else if(!isContainLowerLetter(userData.password)) {
        res.send({success: false, msg: 'Password must contain at least one lowercase letter (a-z)!'});
    }
    else if(!isContainUpperLatter(userData.password)) {
        res.send({success: false, msg: 'Password must contain at least one uppercase letter (a-z)!'});
    }
    else if(!isContainNumber(userData.password)) {
        res.send({success: false, msg: 'Password must contain at least one number (0-9)!'});
    }
    else {
        userServices.signUp(userData,function(err,result) {
            if(err) {
                res.json({err: err});
            }
            else {
                res.json({data: result});
            }
        }); 
    }
},

exports.signIn = function(req, res) {
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('password','Password is required').notEmpty();

    var errors = req.validationErrors();
    if(errors) {
        res.send({success: false, msg: errors});
    }
    else if(!isEmail(req.body.username)) {
        res.send({success: false, msg: 'Invalid username'});
    }
    else {
        var loginDetails = req.body;

        userServices.signIn(loginDetails, function(err,result) {
            if(err) {
                res.json({err: err});
            }
            else {
                res.json({data: result});
            }
        });
    }
},

exports.forgotPassword = function(req, res) {
    req.checkBody('username','Username is required').notEmpty();

    var errors = req.validationErrors();
    if(errors) {
        res.send({success: false, msg: errors});
    } 
    else if(!isEmail(req.body.username)) {
        res.send({success: false, msg: 'Invalid username'});
    }
    else {
        var userDetails = req.body;

        userServices.forgotPassword(userDetails, function(err, result) {
            if(err) {
                res.json({err: err});
            }
            else {
                res.json({data: result});
            }
        });
    }
},

exports.resetPassword = function(req, res) {
    req.checkBody('password','password is required').notEmpty();
    req.checkBody('confirmPassword','confirmPassword is required').notEmpty();

    var userData = req.body;
    var token = req.params.token;
    var errors = req.validationErrors();
    if (errors) {
        res.send({success: false, msg: errors});
    }
    else if(!isPasswordSameAsUsername(userData.username, userData.password)) {
        res.send({success: false, msg: 'Password must be different from Username!'});
    }
    else if(!checkPasswordLength(userData.password)) {
        res.send({success: false, msg: 'Password must contain at least eight characters!'});
    } 
    else if(!isContainLowerLetter(userData.password)) {
        res.send({success: false, msg: 'Password must contain at least one lowercase letter (a-z)!'});
    }
    else if(!isContainUpperLatter(userData.password)) {
        res.send({success: false, msg: 'Password must contain at least one uppercase letter (a-z)!'});
    }
    else if(!isContainNumber(userData.password)) {
        res.send({success: false, msg: 'Password must contain at least one number (0-9)!'});
    }
    else {
        userServices.resetPassword(userData, token, function(err,result) {
            if(err) {
                res.json({err: err});
            }
            else {
                res.json({data: result});
            }
        }); 
    }
}
