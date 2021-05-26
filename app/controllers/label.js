const labelServices = require('../services/label');

class LabelController {
 
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
