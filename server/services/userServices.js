var crypto = require('crypto');
const userModel = require('../models/Users');

exports.signUp = function(userData, callback) {
    var username = userData.username;
    userModel.findByEmail(username,function(err,user) {
        if(err) {
            callback(err,null);
        }
        else {
            if(user) {
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
    userModel.findByEmail(username,function(err,user) {
        if(err) {
            callback(err,null);
        }
        else {
            if(user) {
                userModel.login(loginDetails,user,function(err,result) {
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
    });
},

exports.forgotPassword = function(userDetails, callback) {
    var username = userDetails.username;
    userModel.findByEmail(username, function(err, user) {
        if(err) {
            callback(err,null);
        }
        else {
            if(user) {
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
                userModel.sendMail(username, subject, text, function(err, result) {
                    if(err) {
                        callback(err,null);
                    }
                    else if(result){
                        callback(null, 'An e-mail has been sent');
                    }
                });
            }
            else {
                callback(null,'Authentication failed, User not found.');
            }
        }
    })
},

exports.resetPassword = function(userDetails, token, callback) {
    userModel.resetPassword(userDetails, token, function(err, result) {
        if(err) {
            callback(err,null);
        }
        else if(!result) {
            callback(null,'Password reset token is invalid or has expired.');
        }
        else if(result) {
            subject = 'Your password has been changed';
            text = 'Hello,\n\n' +
            'This is a confirmation mail that the password for your account ' + 
                result.username + ' has just been changed.\n'

            userModel.sendMail(result.username, subject, text, function(err, result) {
                if(err) {
                    callback(err,null);
                }
                else if(result){
                    callback(null, 'Success! Your password has been changed.');
                }
            });
        }
    })
}