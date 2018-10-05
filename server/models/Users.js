const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const settings = require('../config/settings');

// Create User Schema
const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});

UserSchema.pre('save', function(next) {
    var user = this;
      // Check if document is new or a new password has been set
    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err,salt) {
            if(err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function(err,hash) {
                if(err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});

var User = mongoose.model('serverUser',UserSchema);

function registration() {

}

registration.prototype.findByEmail = function(username) {
    return new Promise(function(resolve,reject) {
        User.findOne({username: username},function(err,newuser) {
            if(!newuser) {
                resolve(newuser);
            }
            else {
                reject(err);
            }
        });
    });
},

registration.prototype.register = function(userData) {
    var user = new User(userData);
    return new Promise(function(resolve,reject) {

        if(userData.password === userData.confirmPassword) {
            var newUser = new User({
                'firstname': user.firstname,
                'lastname': user.lastname,
                'username': user.username,
                'password': user.password
            });
    
            newUser.save()
                .then(user => {
                    resolve('User register successfully.',user);
                })
                .catch(err => {
                reject(err);
            });
        }
        else {
            reject('Password does not match.');
        }
    });
},

registration.prototype.login = function(loginDetails) {
    var user = new User(loginDetails);
    return new Promise(function(resolve,reject) {
        User.findOne({
            username: user.username
        }, function(err, loginuser) {
            if(err) throw err;
            
            if(!loginuser) {
                reject("Authentication failed, User not found.");
            }
            else {
                //check if password matches
                bcrypt.compare(user.password, loginuser.password, function(err, isMatch) {
                    if(isMatch && !err) {
                        //if user is found and password is right create a token
                        var token = jwt.sign(loginuser.toJSON(), settings.secret);
                        //return the information including token as JSON
                        resolve(({success: true, user: loginuser, token: 'JWT ' + token}));
                        // resolve("Successfully loged in...");
                    }
                    else {
                        reject("Authentication failed, Wrong password");
                    }
                });
            }
        });
    });
}

module.exports = new registration;