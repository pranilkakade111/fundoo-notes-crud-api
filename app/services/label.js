/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : To Create Database Schema For API
 * @file            : label.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 14-05-2021
 ************************************************************************* */
const { reject, resolve } = require('bluebird');
const labelmodel = require('../models/label');

class LabelService {
  /**
   * @description request for save data to database using model methods
   * @param {*}  data data to be saved in json format
   */
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

  /**
   * @description Update label data to database using model methods
   * @param {*}  data data holds LabelId
   */
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

  /**
   * @description Delete Label From The database using model methods
   * @param {*}  labelDet holds labelId 
   */
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

  /**
   * @description Retrive All the Label Form the Database using models Method  
   */
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

