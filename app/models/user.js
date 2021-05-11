/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : To Create Database Schema For API
 * @file            : user.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 02-05-2021
 ************************************************************************* */
const { required } = require('@hapi/joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    firstName :{type: String ,required: true}, 
    lastName :{type: String ,required: true},
    email : {type: String , unique: true ,required: true},
    password : {type: String ,required: true},
    
}, {
    timestamps: true,
    versionKey: false
});

UserSchema.pre('save' ,async function (next) {
    try {
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(this.password , salt)
       this.password = hashedPassword
       next() 
    } catch (error)
     {
        next(error)
     }
    
});

const userModel = mongoose.model('User' ,UserSchema);

class UserModel {
    createUser = (userData ,callback) => {
        const userr = new userModel(userData);
        userr.save((err, userResult) => {
            (err) ? callback(err ,null) : callback(null ,userResult);            
        });
    };

    loginUser = (userLogin, callback) => {
        userModel.findOne({ email: userLogin.email })
        .then((user)=>{
            callback(null, user);
        });
    };

    forgotPassword = (data ,callback) => {
        userModel.findOne({email: data.email })
        .then((userOne)=>{
            callback(null, userOne);
        });
    }

    resetPassword = async (data, callback) => {
        const salt = await bcrypt.genSalt(10)
        const encrypt = await bcrypt.hash(data.password , salt) 
        userModel.findOneAndUpdate({ email: data.email }, { password: encrypt } ,{new: true})
        .then((cred)=>{
            callback(null, cred);
        }); 
      };

}
module.exports = new UserModel();