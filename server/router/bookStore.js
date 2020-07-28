const express = require("express");
const router = express.Router();
const BookStore = require("../models/BookStore");
const Users = require("../models/Users");
const { authCheck } = require("../middleware/auth");

/*
* bookStore/getAllBooks

*/

router.get("/getAllBooks", authCheck, async (req, res) => {
  const user_id = req.user.user_id;

  await Users.findOne({ _id: user_id }, { passWord: 0, date: 0, __v: 0 })
    .populate("bookStore")
    .exec((err, userInfo) => {
      if (err) return res.status(401).send(err);

      res.status(200).json(userInfo);
    });
});

router.post("/addBooks", authCheck, async (req, res) => {
  const {
    bookTitle,
    bookAuthor,
    bookImage,
    bookRate,
    bookIsbn,
    report,
  } = req.body;
  try {
    const addBooks = await new BookStore({
      bookTitle: bookTitle,
      bookAuthor: bookAuthor,
      bookImage: bookImage,
      bookRate: bookRate,
      bookIsbn: bookIsbn,
      report: [report],
    });
    await addBooks.save();
    //send로 모든 책의 정보를 보낼수가 있나?... 페이지 이동하면서 새로고침되면 다 날라갈텐데.
    res.status(200).send("add books successful");
  } catch (err) {}
});
module.exports = router;
