const graphImgSchema = require('../models/graph_img_schema');
exports.graphImgController = async(req , res) =>{
    try{
        const {station} = req.body;
        
        const existingStation = await graphImgSchema.findOne({station});
        res.status(200).json({
            success: true,
            data : existingStation.img_url,
            message : "Station Found Successfully"
        })
    }
    catch(e){
        res.status(500).json({
            success: false,
            // data : existingStation.graph,
            message : "internal server error"
        })
    }
}