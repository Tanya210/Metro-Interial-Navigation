const mongoose = require("mongoose");
const graph_schema = new mongoose.Schema(
    {
         station: { 
            type : String,
            require : true
        },
        graph:[{
            node : String,
            connectsTo : [{
                node : String,
                desc : String , 
                Value : String,
            }]
        }]
    }
)

module.exports = mongoose.model("graph" , graph_schema);