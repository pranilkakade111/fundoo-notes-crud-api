/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : To hit the perticular API 

 * @file            : user.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 02-05-2021
 *
 ************************************************************************* */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userservices = require('../services/user');
const { requestValidationSchema, createToken } = require('../../utility/helper');
require('dotenv').config();

class UserReg {
    /**
   * @description add user to database
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
    createUser = (req, res) => {
        if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
            return res.status(400).send({
                success: false,
                message: "Fileds Cannot Be Empty...!!!"
            })
        }

        const result = requestValidationSchema.validate(req.data);
        if (result.error) {
            return res.send("Enter the valid Data")
        }

        const userDetails = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };

        userservices.createUser(userDetails, (err, userResult) => {
            if (err) {
                res.status(400).send({
                    success: false,
                    message: err.message
                });
            } else {
                res.status(200).send({
                    success: true,
                    message: "Data Inserted Successfully....!!",
                    data: userResult
                });
            }
        });
    };
   /**
   * @description Login With User Credential
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
    loginUser = (req, res) => {
        const userLogin = {
            email: req.body.email,
            password: req.body.password
        };
        userservices.loginUser(userLogin, (error, data) => {
            if (error) {
                return res.status(400).send({
                    success: false,
                    message: 'Login Failed....!!!!',
                    error
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Login Successful...!!!',
                    Token: createToken(data)
                });
            }

        });

    }

   /**
   * @description Send Reset Password Link To EmailID
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
    forgotPassword = (req, res) => {
        const forgotPass = {
            email: req.body.email
        };

        userservices.forgotPassword(forgotPass, (err, result) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Failed To Send An Email...!!!',
                    err
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Reset Link Sent On Register Email Id...Successully...!!!',
                    result
                });
            }
        });
    };

    /**
   * @description Reset Password 
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */   
    resetPassword = (req,res) => {
        try {
            const userInfo = {
                newPassword: req.body.newPassword, 
                email: req.userData.email,
            }
            userservices.resetPassword(userInfo ,(err,result) => {
                if(err) {
                  return res.status(401).send({
                        success: false,
                        message: 'Failed To Reset Password',
                        err,
                    });
                } else {
                  return res.status(200).send({
                        success: true,
                        message: 'Reset Password Successfully....!!! ',
                        
                    });
                }
            });
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Token Is Expired Or Not Valid...!!!!'
            });
        }
       
    };

    /**
   * @description Social Login With Google
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */

    socialLogin(req, res) {
        let googleProfile = req.user.profile;
        let response = {};
        let googleInfo = {
          firstName: googleProfile.name.givenName,
          lastName:  googleProfile.name.familyName,
          userName:  googleProfile.emails[0].value,
          password:  null,
          googleId:  googleProfile.id,
          googleLogin: true,
        };
        userservices.socialLogin(googleInfo).then((data) => {
          response.status = true;
          response.message = 'Login Successfully...!';
          response.token = data.token;
          return res.status(200).send(response);
        }).catch((err) => {
            response.status = false;
            response.message = 'Login Failed...!';
            return res.status(500).send(response);  
        });
         
    };
}

module.exports = new UserReg();