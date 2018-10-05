const userModel = require('../models/Users');

exports.createUser = function(userData) {
    return new Promise(function(resolve,reject) {

        var username = userData.username;
        userModel.findByEmail(username) 
            .then(user => {
                userModel.register(userData)
                    .then(user => {
                        resolve(user);
                    })
                    .catch(err => {
                        reject(err);
                    });
            })
            .catch(err => {
                reject('User already register');
            });
    });
}

exports.login = function(loginDetails) {
    return new Promise(function(resolve, reject) {
        userModel.login(loginDetails)
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(err);
            });
    });
}

