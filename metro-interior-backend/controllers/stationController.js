// const bcrypt = require("bcrypt");
const stationSchema = require('../models/station_schema');

exports.stationController = async (req, res) => {
  try {
    // get data;
    // const {name} = req.body;
    const response = await stationSchema.find();
    if(!response){
        return res.status(401).json({
            success : false,
            data : "empty",
            message :"no data present"
        })
    }
    res.status(200).json({
        success : true,
        data : response,
        message :"data present"
    })
  } 
  catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again."
    });
  }
}
