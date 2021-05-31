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
    createUser = (userData, callback) => {
        const userr = new userModel(userData);
        userr.save((err, userResult) => {
            (err) ? callback(err, null) : callback(null, userResult);
        });
    };

    loginUser = (userLogin, callback) => {
        userModel.findOne({ email: userLogin.email })
            .then((user) => {
                callback(null, user);
            });
    };

    forgotPassword = (data, callback) => {
        userModel.findOne({ email: data.email })
            .then((userOne) => {
                callback(null, userOne);
            });
    }

    resetPassword = async (data, callback) => {
        const salt = await bcrypt.genSalt(10)
        const encrypt = await bcrypt.hash(data.newPassword, salt)
        userModel.findOneAndUpdate({ email: data.email }, { password: encrypt }, { new: true })
            .then((cred) => {
                callback(null, cred);
            });
    };

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
