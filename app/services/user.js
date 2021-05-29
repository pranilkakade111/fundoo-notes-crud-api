/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : Having Business Logic of perticular API

 * @file            : user.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 02-05-2021
 ************************************************************************* */
const usermodel = require('../models/user');
const bcrypt = require('bcrypt');
const {nodeMail} = require('../../utility/helper');
const jwt = require('jsonwebtoken');

class UserRegis {

    createUser = (userData ,callback) =>{
        usermodel.createUser(userData,callback);
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


    socialLogin(googleInfo) {
        return new Promise((resolve, reject) => {
          usermodel.socialLogin(googleInfo).then((data) => {
            let payload = {
                '_id' : data._id,
                'userName': data.userName
            };
            let token = jwt.sign(payload, process.env.JWT);
            resolve({data, token});
          }).catch((err) => {
              reject(err);
          });

        });
         
    };
}

module.exports = new UserRegis();