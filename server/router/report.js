const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const MyLibrary = require("../models/MyLibrary");
const { authCheck } = require("../middleware/auth");

//* bookUuid 에 맞는 모든 report 요청 , post인 이유는 bookUuid를 받기위함.
router.post("/AllReport", authCheck, async (req, res) => {
  const { bookUuid } = req.body;
  await Report.find({ bookUuid: bookUuid }, (err, docs) => {
    if (err) res.status(401).send(err);
    res.status(200).send({ Report: docs });
  });
});

//* bookUuid 를 추가하여 report 생성.
router.post("/addReport", authCheck, async (req, res) => {
  const { bookUuid, uuid, reportMemo } = req.body;

  try {
    //* bookUuid 는 Report 가 ref하고있는 책을 _id 대신 찾기 위해 설정해놓음
    await Report.create(
      {
        uuid: uuid,
        reportMemo: reportMemo,
        bookUuid: bookUuid,
        myLibrary: await MyLibrary.findOne({ uuid: bookUuid }),
      },
      (err, docs) => {
        if (err) res.status(401).send(err);
        res.status(200).send("add Report success");
      }
    );
  } catch (err) {
    res.status(401).send(err);
  }
});

//* uuid는 중복율이 굉장히 낮아 uuid로만 report를 찾아 삭제하는 요청.
router.post("/deleteReport", authCheck, async (req, res) => {
  const { uuid } = req.body;

  await Report.remove({ uuid: uuid }, (err, docs) => {
    if (err) res.status(401).send(err);
    res.status(200).send(`delete report success`);
  });
});

module.exports = router;
