/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : To Create Database Schema For API
 * @file            : user.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 02-05-2021
 ************************************************************************* */
const { required, boolean } = require('@hapi/joi');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    googleId: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    googleLogin: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false
});

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
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

    loginSocial = async (profile, done) => {
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser((id, done) => {
            userModel.findById(id, (err, user) => done(err, user));
        });

        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: 'http://localhost:5000/google/callback',
        }));

        const newUser = {
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            userName: profile.emails[0].value,
            password: null,
            googleLogin: true            
        }

        try {
          let user = await userModel.findOne({ googleId: profile.id });
          if(user){
            done(null, user);  
          } else {
              user = await userModel.create(newUser);
              done(null, user);
          } 
        } catch (error) {
          console.log(error);  
        }
    };
}
module.exports = new UserModel();
