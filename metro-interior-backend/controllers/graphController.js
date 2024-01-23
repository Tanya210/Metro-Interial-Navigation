const graphSchema = require('../models/graph_schema');
exports.graphController = async(req , res) =>{
    try{
        const {station} = req.body;
        if(!station){
            return res.status(401).json({
                success : false,
                message : "Please Select Station"
            })
        }
        const existingStation = await graphSchema.findOne({station});
        if(!existingStation){
           return res.status(401).json({
                success : false,
                message : "Not Such Station Data Exists",
            })
        }
        res.status(200).json({
            success: true,
            data : existingStation.graph,
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