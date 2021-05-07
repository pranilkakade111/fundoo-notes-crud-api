const usermodel = require('../models/user');
const bcrypt = require('bcrypt');
const {nodeMail} = require('../../utility/helper');

class UserRegis {

    createUser = (userData ,callback) =>{
        usermodel.createUser(userData,callback);
    };

    loginUser = (userLogin, callback) => {
        usermodel.loginUser(userLogin ,(_err, result) => {
            if (result) {
                bcrypt.compare(userLogin.password, result.password, (err, data) => {
                    if (err) {
                        callback(err ,null);
                    }
                    if (data) {
                        const resultSuccess = {
                            message: 'Successful....!!!'
                        };
                        callback(null ,resultSuccess)

                    } else {
                        callback('Password Does Not Match...!!!!')
                    }
                });

            } else {
                callback('User Not Found...!!!');
            }
        });
    }

    forgotPassword = (data ,callback) => {
        usermodel.forgotPassword(data ,(err ,result) => {
            if(result) {
                if(err) {
                    callback(err ,null);
                } else {
                    callback(null ,nodeMail(data)); 
                }
            }else {
                callback('Email Does not Exist.... ');
            }
        });
    };
    
    resetPassword = (data ,callback) => {
        usermodel.resetPassword(data ,callback);
    }
}

module.exports = new UserRegis();