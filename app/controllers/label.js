/** ***********************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * Purpose          : To Create Database Schema For API
 * @file            : label.js
 * @author          : Pranil Kakade
 * @version         : 1.0
 * @since           : 14-05-2021
 ************************************************************************* */
const labelServices = require('../services/label');

class LabelController {
 
    /**
   * @description Create A Label 
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
  createLabel = async (req, res) => {
      if(!req.body.label){
          return res.status(400).send({
              success: false,
              message: 'Label Field Can Not Be Empty...!!!'
          });
      }
    const labelDetails = {
        label: req.body.label,
        userId: req.userId,
    };
    const labelData = await labelServices.createLabel(labelDetails);
    if(labelData !== null) {
        return res.status(200).send({
          success: true,
          message: 'Label Created Successfully.....!!!!',
          labelData,
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Failed To Create Label.....!!'
        });
    }
  };

  /**
   * @description Update A Existing Label With Label Id 
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
  updateLabel = async (req, res) => {
    if(!req.body.label){
        return res.status(400).send({
            success: false,
            message: 'Label Field Can Not Be Empty...!!!'
        });
    }

    const labelDetail = {
      label: req.body.label,
      labelId: req.params.labelId,
    };

    const labelData = await labelServices.updateLabel(labelDetail);
    if(labelData !== null){
        return res.status(200).send({
            success: true,
            message: 'Label Get Updated Successfully....!!!' + req.params.labelId,
            data: labelData,
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Failed To Update Label.....!!' + req.params.labelId,
        });
    }
  };

  /**
   * @description Delete A Label From Database
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
  deleteLabel = async (req, res) => {
    const labelDet = req.params.labelId;
    const labelData = await labelServices.deleteLabel(labelDet);
    if(labelData !== null){
        return res.status(200).send({
            success: true,
            message: 'Label Get Deleted Successfully....!!!' + req.params.labelId,
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Failed To Delete Label.....!!' + req.params.labelId,
        });
    }
  };

  /**
   * @description Retrive All The Labels
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
  getLabel = async (req, res) => {
    const labelData = await labelServices.getLabel();
    if(labelData !== null){
        return res.status(200).send({
            success: true,
            message: 'All Labels Get Retrived Successfully....!!!',
            data: labelData,
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Failed To Retrive All Labels.....!!',
        });
    }
  };
}
module.exports = new LabelController();
