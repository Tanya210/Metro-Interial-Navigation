const express = require('express');
const dbConnect = require('./config/database');
const cors = require('cors');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// MIDDLEWARE TO PARSE JSON
// const cookieParser = require("cookie-parser");
// app.use(cookieParser);
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
const user = require("./routes/user");

// mount api routes
app.use("/api/v1",user);
app.listen(PORT , (req , res)=>{
    console.log(`server started at port no ${PORT}`);
})
dbConnect();

app.get('/', (req , res) =>{
    res.send("hello jee , kaise ho aap");
})