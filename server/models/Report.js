const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  reportMemo: {
    type: String,
  },
  bookUuid: {
    type: String,
    required: true,
  },
  myLibrary: {
    type: String,
    ref: "MyLibrary",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Report", reportSchema);
