const mongoose = require('mongoose');

const lableSchema = mongoose.Schema({
  lable: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
  versionKey: false,
});

const lableModel = mongoose.model('Lable', lableSchema);

class Model {
  createLable = async (data) => {
    
    const lable = new lableModel({
    lable: data.lable,
    userId: data.userId,  
    });
    const lableExe = await lable.save();
    return lableExe;
  };

  updateLable = async (data) => {
    const lableEx = await lableModel.findByIdAndUpdate(data.lableId, { lable: data.lable }, { new: true });
    return lableEx;
  };

  deleteLable = async (lableDet) => {
    const lableExe = await lableModel.findByIdAndRemove(lableDet);
    return lableExe;
  };

  getLable = async () => {
    const allLable = await lableModel.find();
    return allLable;
  };

}

module.exports = new Model();
