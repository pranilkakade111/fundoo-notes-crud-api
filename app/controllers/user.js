const userservices = require('../services/user');
const { requestValidationSchema ,createToken } = require('../../utility/helper');
const joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
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
           if(error){
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
    forgotPassword = (req,res) => {
        const forgotPass = { 
            email: req.body.email 
        };

        userservices.forgotPassword(forgotPass ,(err ,result) => {
            if(err) {
                return res.status(500).send({
                    success: false,
                    message: 'Failed To Send An Email...!!!',
                    err
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: 'Email Sent Successully...!!!',
                    result
                });
            }
        });
    };


}

module.exports = new UserReg();