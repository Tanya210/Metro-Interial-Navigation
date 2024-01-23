const mongoose = require("mongoose");
const station_schema = new mongoose.Schema(
    {
         name: { 
            type : String,
            require : true,
        },
        entry:[
            type = String,
        ]
    }
)

module.exports = mongoose.model("station" , station_schema);