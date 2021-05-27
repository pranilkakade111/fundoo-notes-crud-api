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
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
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

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: 'http://localhost:5000/google/callback',
  },
   async (accessToken, refreshToken, profile, done) => {
       const newUser = {
           googleId: profile.id,
           firstName: profile.name.givenName,
           lastName: profile.name.familyName,
           email: profile.emails[0].value,
           password: null,
           googleLogin: true,
       };
       try {
         let user = await userModel.findOne({ googleId: profile.id });
         if(user) {
             done(null, user);
         } else {
             user = await userModel.create(newUser);
             done(null, user);
         }
       } catch (err) {
         console.log(err);
       }
   }
  ));
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    userModel.findById(id, function(err, user) {
      done(err, user);
    });
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

    socialLogin = (profile, callback) => {
       const googleId = profile.id,
       const firstName = profile.name.givenName,
       const lastName = profile.name.familyName,
       const userName = profile.emails[0].value,
       const password = null,
       const googleLogin = true, 
    };
}
module.exports = new UserModel();
