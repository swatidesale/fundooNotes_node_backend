const userServices = require('../services/userServices');

function isEmail(email) {
    if (email.match(/^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/)) {
        return true
    } else {
        return false
    }
}

exports.forgotPassword = function(req,res) {
    req.checkBody('username','Username is required').notEmpty();

    var errors = req.validationErrors();
    if(errors) {
        res.send({success: false, msg: errors});
    }
    else if(!isEmail(req.body.username)) {
        res.send({success: false, msg: 'Invalid username.'});
    }
    else {
        var userDetails = req.body;

        userServices.forgotPassword(userDetails)
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.send(err);
            });
    }
}

exports.signUp = function(req,res) {
    req.checkBody('firstname','firstname is required').notEmpty();
    req.checkBody('lastname','lastname is required').notEmpty();
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('password','password is required').notEmpty();
    req.checkBody('confirmPassword','confirmPassword is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.send({success: false, msg: errors});
    }
    else if(!isEmail(req.body.username)) {
        res.send({success: false, msg: 'Invalid Email Address.'});
    } 
    else {
        var userData = req.body;

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

exports.signIn = function(req,res) {
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

        userServices.signIn(loginDetails,function(err,result) {
            if(err) {
                res.json({err: err});
            }
            else {
                res.json({data: result});
            }
        });
    }
}
