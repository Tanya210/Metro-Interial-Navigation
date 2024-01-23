const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL, {
        useNewurlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{console.log("connection successful")})
    .catch((error)=>{
        console.log("recieve error");
        process.exit(1);
    });
}

module.exports = dbConnect;