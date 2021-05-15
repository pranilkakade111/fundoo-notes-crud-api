const lableServices = require('../services/lable');

class LableController {
 
  createLable = async (req, res) => {
      if(!req.body.lable){
          return res.status(400).send({
              success: false,
              message: 'Lable Field Can Not Be Empty...!!!'
          });
      }
    const lableDetails = {
        lable: req.body.lable,
        userId: req.userId,
    };
    const lableData = await lableServices.createLable(lableDetails);
    if(lableData !== null) {
        return res.status(200).send({
          success: true,
          message: 'Lable Created Successfully.....!!!!',
          lableData,
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Failed To Create Lable.....!!'
        });
    }
  };

  updateLable = async (req, res) => {
    if(!req.body.lable){
        return res.status(400).send({
            success: false,
            message: 'Lable Field Can Not Be Empty...!!!'
        });
    }

    const lableDetail = {
      lable: req.body.lable,
      lableId: req.params.lableId,
    };

    const lableData = await lableServices.updateLable(lableDetail);
    if(lableData !== null){
        return res.status(200).send({
            success: true,
            message: 'Lable Get Updated Successfully....!!!' + req.params.lableId,
            lableData,
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Failed To Update Lable.....!!' + req.params.lableId,
        });
    }
  };

  deleteLable = async (req, res) => {
    const lableDet = req.params.lableId;
    const lableData = await lableServices.deleteLable(lableDet);
    if(lableData !== null){
        return res.status(200).send({
            success: true,
            message: 'Lable Get Deleted Successfully....!!!' + req.params.lableId,
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Failed To Delete Lable.....!!' + req.params.lableId,
        });
    }
  };

  getLable = async (req, res) => {
    const lableData = await lableServices.getLable();
    if(lableData !== null){
        return res.status(200).send({
            success: true,
            message: 'All Lables Get Retrived Successfully....!!!',
            data: lableData,
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Failed To Retrive All Lables.....!!',
        });
    }
  };

}

module.exports = new LableController();
