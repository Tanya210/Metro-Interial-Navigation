const bcrypt = require("bcrypt");
const userSchema = require('../models/user_schema');

exports.SignUPController = async (req, res) => {
  try {
    // get data;
    const { firstname, lastname, email, password, confirmPassword, role } = req.body;
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Passwords do not match"
      });
    }
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password"
      });
    }
    // create entry for user
    await userSchema.create({ firstname, lastname, email, password : hashPassword, role });
    return res.status(200).json({
      success: true,
      message: "User created successfully"
    });
  } 
  catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again."
    });
  }
}
