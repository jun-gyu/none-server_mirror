const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const MyLibrary = require("../models/MyLibrary");
const { authCheck } = require("../middleware/auth");

//* bookUuid 에 맞는 모든 report 요청 , post인 이유는 bookUuid를 받기위함.
router.post("/getAllReport", authCheck, async (req, res) => {
  const { bookUuid } = req.body;
  await Report.find({ bookUuid: bookUuid }, (err, docs) => {
    if (err) res.status(404).send(err);
    res.status(200).send(docs);
    /*docs 는
 [
    {
        "_id": "5f2a6e6ef4b1a53b85cf253d",
        "uuid": "123",
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
  const { bookUuid, uuid, reportMemo } = req.body;
  /* 
  uuid: 
  reportMemo: 
  bookUuid:   
  이 형태로 요청 보내면 됩니다! 
  date를 현시각으로 바꾸는건 못했습니다... 
  
*/

  //* bookUuid 는 Report 가 ref하고있는 책을 _id 대신 찾기 위해 설정해놓음
  await Report.create(
    {
      uuid: uuid,
      reportMemo: reportMemo,
      bookUuid: bookUuid,
      myLibrary: await MyLibrary.findOne({ uuid: bookUuid }),
    },
    (err, docs) => {
      if (err) res.status(404).send(err);
      res.status(200).send("add Report success");
    }
  );
});

//* uuid는 중복율이 굉장히 낮아 uuid로만 report를 찾아 삭제하는 요청.
router.post("/deleteReport", authCheck, async (req, res) => {
  const { uuid } = req.body;
  /*report 에 부여한 uuid 를 요청에 담아 보내주시가만 하면됩니다!*/
  await Report.remove({ uuid: uuid }, (err, docs) => {
    if (err) res.status(404).send(err);
    res.status(200).send(`delete report success`);
  });
});

router.post("/updateReport", authCheck, async (req, res) => {
  const { uuid, reportMemo } = req.body;
  /*
{
   "uuid":"12312",
   "reportMemo":"12312516"
}
*/
  await Report.findOneAndUpdate(
    { uuid: uuid },
    { reportMemo: reportMemo },
    (err, docs) => {
      if (err) res.status(404).send(err);
      res.status(200).send("success updateReport");
    }
  );
});
module.exports = router;
