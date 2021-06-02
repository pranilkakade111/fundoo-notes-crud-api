/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : To Create Database Schema For API
 * @file            : label.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 14-05-2021
 ************************************************************************* */
const mongoose = require('mongoose');

const labelSchema = mongoose.Schema({
  label: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
  versionKey: false,
});

const labelModel = mongoose.model('Label', labelSchema);

class Model {
  /**
   * @description save request label data to database
   * @param {*} data holds data to be saved in json formate
   */
  createLabel = async (data) => {
    
    const label = new labelModel({
    label: data.label,
    userId: data.userId,  
    });
    const labelExe = await label.save();
    return labelExe;
  };

    /**
   * @description update label data existed in database
   * @param {*} data holds _id that is label id
   */
  updateLabel = async (data) => {
    const labelEx = await labelModel.findByIdAndUpdate(data.labelId, { label: data.label }, { new: true });
    return labelEx;
  };

  /**
   * @description remove label data from database
   * @param {*}labelDet holds _id that is label  id
   */
  deleteLabel = async (labelDet) => {
    const labelExe = await labelModel.findByIdAndRemove(labelDet);
    return labelExe;
  };

  /**
   * @description retrive all label data from database
   */
  getLabel = async () => {
    const allLabel = await labelModel.find();
    return allLabel;
  };

}

module.exports = new Model();
