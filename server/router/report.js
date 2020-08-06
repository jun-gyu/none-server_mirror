const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const MyLibrary = require("../models/MyLibrary");
const { authCheck } = require("../middleware/auth");

//* bookUuid 에 맞는 모든 report 요청 , post인 이유는 bookUuid를 받기위함.
router.post("/getAllReport", authCheck, async (req, res) => {
  const { bookUuid } = req.body;
  await Report.find({ bookUuid: bookUuid }, (err, docs) => {
    if (err) return res.status(404).send(err);
    res.status(200).send(docs);
    /*docs 는
 [
    {
        "_id": "5f2a6e6ef4b1a53b85cf253d",
        "reportUuid": "123",
        "reportMemo": "123",
        "bookUuid": "5ef9797e-ca03-4c0b-a4a6-66a3d6c36a54",
        "myLibrary": "5f29139c2d305616cfa2ca73",
        "date": "2020-08-05T08:31:42.147Z",
        "__v": 0
    }
]
    이런 형태로 클라이언트에 들어가요! 
    */
  });
});

//* bookUuid 를 추가하여 report 생성.
router.post("/addReport", authCheck, async (req, res) => {
  //* 책이 중복될경우 오류를 보내주어야함. 추가해야한다.
  const { bookUuid, reportUuid, reportMemo } = req.body;
  /* 
  reportUuid: 
  reportMemo: 
  bookUuid:   
  이 형태로 요청 보내면 됩니다! 
  date를 현시각으로 바꾸는건 못했습니다... 
  
*/

  //* bookUuid 는 Report 가 ref하고있는 책을 _id 대신 찾기 위해 설정해놓음
  await Report.create(
    {
      reportUuid: reportUuid,
      reportMemo: reportMemo,
      bookUuid: bookUuid,
      myLibrary: await MyLibrary.findOne({ bookUuid: bookUuid }),
    },
    (err, docs) => {
      if (err) return res.status(404).send(err);
      res.status(200).send("add Report success");
    }
  );
});

//* uuid는 중복율이 굉장히 낮아 uuid로만 report를 찾아 삭제하는 요청.
router.post("/deleteReport", authCheck, async (req, res) => {
  const { reportUuid } = req.body;
  /*report 에 부여한 reportUuid 를 요청에 담아 보내주시가만 하면됩니다!*/
  await Report.remove({ reportUuid: reportUuid }, (err, docs) => {
    if (err) return res.status(404).send(err);
    res.status(200).send(`delete report success`);
  });
});

//* updateReport
router.post("/updateReport", authCheck, async (req, res) => {
  const { reportUuid, reportMemo } = req.body;
  /*
 {
   "reportUuid":"12312",
   "reportMemo":"12312516"
 }
*/
  await Report.findOneAndUpdate(
    { reportUuid: reportUuid },
    { reportMemo: reportMemo },
    (err, docs) => {
      if (err) return res.status(404).send(err);
      res.status(200).send("success updateReport");
    }
  );
});

//* 독후감이 있는 책만 불러오는 작업.
router.get("/theBooksWithReport", authCheck, async (req, res) => {
  const { user_id } = req.user;
  console.log(user_id);
  /*
   * user_id 로 유저에 맞는 책 조회 후 각 책들의 uuid를 추출, report의 bookUuid와 맞는 책들만 보내줌.
   */

  // 유저가 추가한 책 목록들의 bookUuid만 반환
  const books = await MyLibrary.find(
    { user: user_id },
    {
      _id: 0,
      bookTitle: 0,
      bookAuthor: 0,
      bookImage: 0,
      bookRate: 0,
      user: 0,
      __v: 0,
    },
    (err) => {
      if (err) return res.status(404).send(err);
    }
  );
  // Report가 가지고 있는 myLibrary ObjectId 들을 populate를 통해
  // ObjectId가 아닌 책 정보가 표시되게끔 하는 작업.
  console.log("booksas;kdjasldk", books);
  const reports = await Report.find(
    {},
    // { _id: 0, bookUuid: 0, reportUuid: 0, reportMemo: 0, date: 0, __v: 0 },
    (err) => {
      if (err) return res.status(404).send(err);
    }
  )
    .populate("myLibrary")
    .exec();
  console.log("reportsgdfgdfdfg", reports);
  //books 정보가 없다면 빈배열로 들어옴.
  if (books.length === 0)
    return res.status(404).send({ message: "can not found your books" }).end();

  // 유저가 저장한 책들의 bookUuid와 레포트가 있는 책 정보의 bookUuid를 비교하여 레포트가 있는
  //책의 bookUuid와 같다면 해당 레포트 책 bookUuid를 theBooksWithReport에 저장.
  let theBooksWithReport = [];

  reports.forEach((report) => {
    books.forEach((book) => {
      if (report.myLibrary.bookUuid === book.bookUuid)
        theBooksWithReport.push(report.myLibrary);
    });
  });
  if (theBooksWithReport.length !== 0) {
    return res.status(200).send(theBooksWithReport);
  } else {
    res.status(404).send({ message: "can not found your report books" });
  }
});
module.exports = router;
