var crypto = require('crypto');
const userModel = require('../models/Users');

exports.forgotPassword = function(userDetails) {
    return new Promise(function(resolve, reject) {
        var username = userDetails.username;

        userModel.findByEmail(username) 
            .then(err => {
                resolve('No account with email address exists');
            })
            .catch(user => {
                var buf = crypto.randomBytes(20);
                var token = buf.toString('hex');
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000;
                user.save(); 
                
                var subject = 'Fundoonotes_ResetPassword';
                var text = 'You are receiving this because you (or someone else) have requested the reset' + 
                ' password for your account.\n\n Please click on following link, or paste this into your' +
                ' browser to complete the proccess.\n\n' +
                'http://localhost:3000/resetPassword/' + user._id + token + '\n\n' +
                ' if you did not requested this, please ignore this email and your password will remain unchanged.\n' 
                userModel.sendMail(username,subject,text)
                    .then(user => {
                        resolve('An e-mail has been sent');
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
    });
}

exports.signUp = function(userData, callback) {
    var username = userData.username;
    userModel.findByEmail(username,function(err,result) {
        if(err) {
            callback(err,null);
        }
        else {
            if(result) {
                callback(null,'Username already exists.');
            }
            else {
                userModel.createUser(userData, function(err,result) {
                    if(err) {
                        callback(err,null);
                    }
                    else {
                        if(result) {
                            callback(null,'Register successfully.');
                        }
                        else {
                            callback(result,null);
                        }
                    }
                });
            }
        }
    }); 
},

exports.signIn = function(loginDetails, callback) {
    var username = loginDetails.username;
    userModel.findByEmail(username,function(err,result) {
        if(err) {
            callback(err,null);
        }
        else {
            if(result) {
                userModel.login(loginDetails,result,function(err,result) {
                    if(err) {
                        callback(err,null);
                    }
                    else {
                        callback(null,result);
                    }
                });
            }
            else {
                callback(null,'Authentication failed, User not found.');
            }
        }
    })
}
