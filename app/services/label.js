const { reject, resolve } = require('bluebird');
const labelmodel = require('../models/label');

class LabelService {
  createLabel =  (data) => {
    return new Promise((resolve, reject) => {
      const labelData =  labelmodel.createLabel(data)
      .then((labelData) => {
        return resolve(labelData);
      }).catch((err) => {
        return reject(err);
      });
    });
         
  };

  updateLabel = (data) => {
    return new Promise((resolve, reject) => {
      labelmodel.updateLabel(data)
      .then((labelData) => {
        return resolve(labelData);
      }).catch((err) => {
        return reject(err);
      });
    });  
        
  };

  deleteLabel = (labelDet) => {
    return new Promise((resolve, reject) => {
      labelmodel.deleteLabel(labelDet)
      .then((labelData) => {
        return resolve(labelData);
      }).catch((err) => {
        return reject(err);
      });
    });
       
  };

  getLabel = () => {
    return new Promise((resolve, reject) => {
      const labelData = labelmodel.getLabel()
      .then((labelData) => {
        return resolve(labelData);
      }).catch((err) => {
        return reject(err);
      });
    });
  }; 
}

module.exports = new LabelService();

