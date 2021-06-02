/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : To Create Database Schema For API
 * @file            : user.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 02-05-2021
 ************************************************************************* */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    googleId: { type: String},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String},
    password: { type: String},
    googleLogin: { type: Boolean},
}, {
    timestamps: true,
    versionKey: false
});

UserSchema.pre('save', async function (next) {
    try {
        if(!(this.password == null || this.password == undefined || this.password == '')){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next();
        } else {
            next();
        }
    } catch (error) {
        next(error)
    }
});

const userModel = mongoose.model('User', UserSchema);

class UserModel {
    /**
      * @description save request data to database 
      * @param {*} userData holds data to be saved in json formate
      * @param {*} callback holds a function 
     */
    createUser = (userData, callback) => {
        const userr = new userModel(userData);
        userr.save((err, userResult) => {
            (err) ? callback(err, null) : callback(null, userResult);
        });
    };
   
    /**
      * @description Login the user with the EmailId And Password which is Present in databse
      * @param {*} userLogin holds login data
      * @param {*} callback holds a function 
     */

    loginUser = (userLogin, callback) => {
        userModel.findOne({ email: userLogin.email })
            .then((user) => {
                callback(null, user);
            });
    };

    /**
      * @description send Reset Link to email Id Of User 
      * @param {*} data holds email Id
      * @param {*} callback holds a function 
     */
    forgotPassword = (data, callback) => {
        userModel.findOne({ email: data.email })
            .then((userOne) => {
                callback(null, userOne);
            });
    }

    /**
      * @description find Email Id In the database and callback with user data or error 
      * @param {*} data hold email id
      * @param {*} callback holds a function 
     */
    resetPassword = async (data, callback) => {
        const salt = await bcrypt.genSalt(10)
        const encrypt = await bcrypt.hash(data.newPassword, salt)
        userModel.findOneAndUpdate({ email: data.email }, { password: encrypt }, { new: true })
            .then((cred) => {
                callback(null, cred);
            });
    };

    /**
      * @description Find User with Username(emailId)  
      * @param {*} userData holds data to Search for email and Create For New User
      * @param {*} callback holds a function 
     */
    async socialLogin(userData) {
        return userModel.findOne({ 'userName': userData.userName }).then(data => {
              if(data !== null) {
                 return data
              } else {
                 const data = new userModel({
                     'firstName': userData.firstName,
                     'lastName': userData.lastName,
                     'userName': userData.userName,
                     'password': userData.password,
                     'googleId': userData.googleId,
                     'googleLogin': userData.googleLogin,
                 });
                 return data.save();
                 
              }
          }).catch(err => {
             return('Something went wrong', err);
         });
     };
}
module.exports = new UserModel();
