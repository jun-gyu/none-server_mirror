const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true, // required:true 는 이값이null이 아니여야한다는 뜻
  },
  userid: {
    type: String,
    required: true,
  },
  provider: {
    // social login 시 어느 social 인지, 예) 카카오, 구글.
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);
