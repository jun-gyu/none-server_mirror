const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const MyLibrary = require("../models/MyLibrary");
const Users = require("../models/Users");
const { authCheck } = require("../middleware/auth");

/*
 * myLibrary/getAllBooks
 */

router.get("/getAllBooks", authCheck, async (req, res) => {
  const { user_id } = req.user;

  await MyLibrary.find({ user: user_id }, { __v: 0 }, async (err, docs) => {
    if (err) return res.status(401).send(err);

    res.status(200).json(docs);
  });
});

router.post("/addBooks", authCheck, async (req, res) => {
  const { user_id } = req.user;
  console.log(req.user)
  const { bookUuid, bookTitle, bookAuthor, bookImage, bookRate } = req.body;

  try {
    await MyLibrary.create({
      bookUuid: bookUuid,
      bookTitle: bookTitle,
      bookAuthor: bookAuthor[0],
      bookImage: bookImage,
      bookRate: bookRate,
      user: await Users.findOne({ _id: user_id }),
    });

    // const   await
    //send 수정해야됩니다 지금은 db에 저장이 되는지 보고있슴다
    res.status(200).send("add Books success");
  } catch (err) {
    res.status(403).send(err);
  }
});

// myLibrary book delete
router.post("/deleteBooks", authCheck, async (req, res) => {
  const { bookUuid } = req.body;

  //bookUuid 에 맞는 ref 북 리스트를 삭제한다.
  await MyLibrary.remove({ bookUuid: bookUuid }, async (err) => {
    if (err) res.status(401).send(err);
    res.status(200).send(`delete books success`);
  });
});

module.exports = router;
