const { required } = require('@hapi/joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    firstName :{type: String ,required: true}, 
    lastName :{type: String ,required: true},
    email : {type: String , unique: true ,required: true},
    password : {type: String ,required: true}
}, {
    timestamps: true
});

UserSchema.pre('save', async function (next) {
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
        userr.save((err, userResult)=> {
            (err) ? callback(err ,null) : callback(null ,userResult);            
        });
    };

    loginUser = (userLogin, callback) => {
        userModel.findOne({ email: userLogin.email }, callback)
    };

    forgotPassword = (data ,callback) => {
        userModel.findOne({email: data.email } ,callback)
    }

}
module.exports = new UserModel;