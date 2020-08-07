const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const convertHash = require("../middleware/crypto");
const { makeToken } = require("../middleware/auth");
const dotenv = require("dotenv");
dotenv.config({ path: "../config/.env" });

//* signIn post
router.post("/signIn", async (req, res) => {
  try {
    const { userEmail, passWord } = req.body;

    const hashedPassWord = convertHash(passWord);

    const user = await Users.findOne(
      {
        userEmail: userEmail,
        passWord: hashedPassWord,
      },
      { date: 0, __v: 0 }
    );

    //DB 에 user 정보와 맞는게 있다면.!
    if (user !== null) {
      //create Token
      const accessToken = makeToken(user._id, user.userName, user.userEmail);

      // header 에 Token 추가
      res.header("auth-token", accessToken).send(accessToken);
    } else {
      // DB에 유저 정보와 맞는게 없다면.
      res
        .status(404)
        .send({ message: "you aren't our member , please signUp" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

//* signUp Post
router.post("/signUp", async (req, res) => {
  let { userName, userEmail, passWord } = req.body;

  const hashedPassWord = convertHash(passWord);

  const isExist = await Users.findOne({
    userEmail: userEmail,
    passWord: hashedPassWord,
  });

  if (!isExist) {
    const user = new Users({
      userName: userName,
      userEmail: userEmail,
      passWord: hashedPassWord,
    });

    //*post instance를 mongoDB 에 save

    await user.save((err, docs) => {
      if (err) console.log("saving err in mongoDB", err);
    });

    res.status(200).send({ message: "thank you for signUp" });
  } else {
    res.status(403).send({ message: "중복된 회원입니다." });
    //403 status
    //클라이언트는 콘텐츠에 접근할 권리를 가지고 있지 않습니다.
    //예를들어 그들은 미승인이어서 서버는 거절을 위한 적절한 응답을 보냅니다.
    //401과 다른 점은 서버가 클라이언트가 누구인지 알고 있습니다.
  }
});

module.exports = router;
