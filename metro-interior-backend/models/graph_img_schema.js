const mongoose = require("mongoose");
const graph_img_schema = new mongoose.Schema(
    {
         station: { 
            type : String,
            require : true
        },
        img_url: {
            type : String,
            require : true
        }
    }
)

module.exports = mongoose.model("graph_img" , graph_img_schema);