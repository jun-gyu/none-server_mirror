const mongoose = require("mongoose");

const bookStoreSchema = mongoose.Schema({
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
  bookIsbn: {
    type: String,
    required: true,
    unique: true,
  },
  report: [
    {
      type: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BookStore", bookStoreSchema);
