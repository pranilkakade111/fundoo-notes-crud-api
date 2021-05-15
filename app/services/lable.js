const lablemodel = require('../models/lable');

class LableService {
  createLable = async (data) => {
      if(data) {
       const lableData = await lablemodel.createLable(data);
       return lableData; 
      }
  };

  updateLable = async (data) => {
    if(data) {
        const lableData = await lablemodel.updateLable(data);
        return lableData;
    }
  };

  deleteLable = async (lableDet) => {
    const lableData = await lablemodel.deleteLable(lableDet);
    return lableData;
      
  };

  getLable = async () => {
    const lableData = await lablemodel.getLable();
    return lableData;
  };

}

module.exports = new LableService();

