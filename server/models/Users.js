const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true,
    max: 255, // required:true 는 이값이null이 아니여야한다는 뜻
  },
  userEmail: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    max: 255,
  },
  passWord: {
    type: String,
    required: true,
    min: 6,
  },
});

module.exports = mongoose.model("User", userSchema);
