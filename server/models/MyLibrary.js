const mongoose = require("mongoose");

const myLibrarySchema = mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  bookTitle: {
    type: String,
    required: true,
    max: 255, // required:true 는 이값이null이 아니여야한다는 뜻
  },
  bookAuthor: {
    type: String,
    required: true,
    max: 255,
  },
  bookImage: {
    type: String,
    required: true,
  },
  bookRate: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("MyLibrary", myLibrarySchema);
