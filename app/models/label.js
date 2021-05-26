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
  createLabel = async (data) => {
    
    const label = new labelModel({
    label: data.label,
    userId: data.userId,  
    });
    const labelExe = await label.save();
    return labelExe;
  };

  updateLabel = async (data) => {
    const labelEx = await labelModel.findByIdAndUpdate(data.labelId, { label: data.label }, { new: true });
    return labelEx;
  };

  deleteLabel = async (labelDet) => {
    const labelExe = await labelModel.findByIdAndRemove(labelDet);
    return labelExe;
  };

  getLabel = async () => {
    const allLabel = await labelModel.find();
    return allLabel;
  };

}

module.exports = new Model();
