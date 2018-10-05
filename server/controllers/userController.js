const userServices = require('../services/userServices');

function isEmail(email) {
    if (email.match(/^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/)) {
        return true
    } else {
        return false
    }
}

exports.createUser = function(req,res) {
    req.checkBody('firstname','firstname is required').notEmpty();
    req.checkBody('lastname','lastname is required').notEmpty();
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('password','password is required').notEmpty();
    req.checkBody('confirmPassword','confirmPassword is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.send({success: false, msg: 'All fields are required'});
    }
    else if(!isEmail(req.body.username)) {
        res.send({success: false, msg: 'Invalid Email Address.'});
    } 
    // req.checkBody('username', 'Username is required').notEmpty();
    // else if(!req.body.firstname) {
    //     res.send({success: false, msg: 'Firstname is required.'});
    // } else if(!req.body.lastname) {
    //     res.send({success: false, msg: 'Lastname is required.'});
    // } else if(!req.body.username) {
    //     res.send({suucess: false, msg: 'Username is required.'});
    // } else if(!req.body.password) {
    //     res.send({success: false, msg: 'Password is required.'})
    // }
    else {
        var userData = req.body;

        userServices.createUser(userData) 
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    }
}

exports.login = function(req,res) {
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('password','Password is required').notEmpty();

    var errors = req.validationErrors();
    if(errors) {
        res.send({success: false, msg: 'All fields are required'});
    }
    else if(!isEmail(req.body.username)) {
        res.send({success: false, msg: 'Invalid username'});
    }
    else {
        var loginDetails = req.body;

        userServices.login(loginDetails)
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    }
}