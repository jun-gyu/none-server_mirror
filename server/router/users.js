const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const convertHash = require("../helpfunction/crypto");
const jw = require("json");

router.post("/signin", async (req, res) => {
  try {
    const { useremail, password } = req.body;
    const hashedPassword = convertHash(password);
    const users = await Users.findOne(
      {
        useremail: useremail,
        password: hashedPassword,
      },
      { date: 0, username: 0, _id: 0, __v: 0 }
    );
    console.log("what is in users", users);
    if (users !== null) {
      res.status(200).send("로그인 성공! 효진아 사랑해.");
    } else {
      res.status(404).send("효진아 사랑해. 회원가입해야뎅 헿");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/signup", async (req, res) => {
  let { username, useremail, password } = req.body;
  const hashedPassword = convertHash(password);
  const isExist = await Users.findOne({
    useremail: useremail,
    password: hashedPassword,
  });

  if (isExist === null) {
    const user = new Users({
      username: username,
      useremail: useremail,
      password: hashedPassword,
    });

    try {
      //*post instance를 mongoDB 에 save
      const savedUser = await user.save();
      res.status(200).send("회원가입 축하드립니다! 사랑해요 효진씨");
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    res.status(404).send("중복된 회원입니다.");
  }
});

module.exports = router;
