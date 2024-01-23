const mongoose = require("mongoose");
const user_schema = new mongoose.Schema(
    {
         firstname: { 
            type : String,
            require : true,
            trim : true
        },
         lastname: { 
            type : String,
            required : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            trim : true
        },
        password : {
            type : String,
            required : true,
        },
        role : {
            type : String,
            enum : ["Admin" , "Passenger"],
            require : true,
        }
       
    }
)

module.exports = mongoose.model("user" , user_schema);