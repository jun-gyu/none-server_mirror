const express = require("express");
const router = express.Router();
const Users = require("../models/Users");

router.post("/signin", async (req, res) => {
  try {
    const { useremail, password } = req.body;
    const users = await Users.findOne({
      useremail: useremail,
      password: password,
    });
    console.log("users: ", users);

    if (users !== null) {
      console.log("hi im in if");
      res.status(200).send("로그인 성공! 효진아 사랑해.");
    } else {
      console.log(`im in else`);
      res.status(400).send("효진아 사랑해. 회원가입해야뎅 헿");
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/signup", async (req, res) => {
  let { username, useremail, password } = req.body;
  const user = new Users({
    username: username,
    useremail: useremail,
    password: password,
  });

  try {
    //*post instance를 mongoDB 에 save
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
