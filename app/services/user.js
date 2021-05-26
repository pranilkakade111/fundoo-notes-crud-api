/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : Having Business Logic of perticular API

 * @file            : user.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 02-05-2021
 ************************************************************************* */
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {nodeMail} = require('../../utility/helper');

class UserRegis {

    createUser = (userData ,callback) =>{
        User.createUser(userData,callback);
    };

    loginUser = (userLogin, callback) => {
        usermodel.loginUser(userLogin ,(_err, result) => {
            if (result) {
                bcrypt.compare(userLogin.password, result.password, (err, data) => {
                    if (err) {
                        callback(err, null);
                    }
                    if (data) {
                        callback(null, result);
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
            const detailsData = {
                email: result.email,
                _id: result._id,
            };
            if(result) {
                if(err) {
                    callback(err ,null);
                } else {
                    callback(null ,nodeMail(detailsData)); 
                }
            }else {
                callback('Email Does not Exist.... ');
            }
        });
    };
    
    resetPassword = (data ,callback) => {
        usermodel.resetPassword(data ,callback);
    };

    loginSocial = (googleInfo, callback) => {
        usermodel.loginSocial(googleInfo, callback);
    };
}

module.exports = new UserRegis();