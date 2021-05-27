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
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userservices = require('../services/user');
const { requestValidationSchema, createToken } = require('../../utility/helper');
const { restart } = require('nodemon');
const { data } = require('../../Logger/logger');
require('dotenv').config();

class UserReg {
    /**
     * @description  Create and Save a new user
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
     * @description  Login With User Credentials
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
    * @description  Send Reset Password Link To EmailID 
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

    socialLogin = (req, res) => {
      try {
        const googleInfo = {
          googleId: req.user.id,
          firstName: req.user.name.givenName,
          lastName: req.user.name.familyName,
          userName: req.user.emails[0].value,
          password: null,
          googleLogin: true,  
        };
        userservices.socialLogin(googleInfo, (err, data) => {
            if(err) {
              return res.status(400).send({
                success: false,
                message: 'Login Failed... !',
                err, 
              });
            } else {
              return res.status(200).send({
                success: true,
                message: 'Login Successful...!!',
                Token: createToken(data),  
              });  
            }
        }); 
      } catch (err) {
         res.send({
            success: false,
            message: 'Internal Server Error...!',
            err,
        });
      }
    };
}

module.exports = new UserReg();