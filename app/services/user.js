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

     /**
     * @description save request data to database using model methods
     * @param {*} userData holds data to be saved in json formate
     * @param {*} callback holds a function 
     * */
    createUser = (userData ,callback) =>{
        usermodel.createUser(userData,callback);
    };

    /**
     * @description Login The User return result accordingly to database using model methods
     * @param {*} userLogin holds data to be saved in json formate
     * @param {*} callback holds a function 
    */
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

    /**
     * @description validate credentials and return result accordingly to database using model methods
     * @param {*} data 
     * @param {*}  callback callback funcntion
     */
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
    
    /**
     * @description Call The Reset Function of model
     * @param {*} data 
     * @param {*}  callback callback funcntion
     */
    resetPassword = (data ,callback) => {
        usermodel.resetPassword(data ,callback);
    };


    /**
     * @description Social Login With Google
     * @param {*} googleInfo 
     */
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