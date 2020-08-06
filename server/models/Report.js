const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  reportUuid: {
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "MyLibrary",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Report", reportSchema);
