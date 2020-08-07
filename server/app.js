"use strict";

const express = require("express");
const app = express();
const connectDB = require("./config/db");
// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//session 을 알아보자.
//*Load config

dotenv.config({ path: "./config/.env" });
//* connect db
connectDB();

//*middle ware
/*
 * session(option)
 * secret - session hijacking을 막기위해 hash값에 추가로 들어가는 값 (Salt와 비슷한 개념)
 * resave - true = > 세션이 수정 되었다면 저장 false => 수정되지 않았다면 재 저장 안함.
 * saveUninitialize: true - 세션이 저장되기 전에 uninitialized 상태로 만들어 저장
 */
// const sessionStore = new MongoStore({
//   mongooseConnection: connectDB,
//   collection: "sessions",
// });
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     // store: sessionStore,
//     cookie: { maxAge: 1000 * 60 * 60 }, // 60분
//   })
// );

app.use(
  cors({
    origin: [`${process.env.AWSEC2PORT}`],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
 * 요청 URL 주소
 * /users/signIn   로그인
 * /users/signUp   회원가입
 * /bookStore
 */

//*router
app.use("/users", require("./router/users"));
app.use("/myLibrary", require("./router/mylibrary"));
app.use("/report", require("./router/report"));
//*get 요청 처리
app.get("/", (req, res) => {
  res.send("hello there , here is the root plz check router");
});

//? loggin 활용. (postman 사용시)
app.use(morgan("dev"));

//*Listening to the server
app.listen(process.env.PORT, () => {
  console.log(
    `this server listen to ${process.env.PORT} port & ${process.env.AWSEC2PORT}`
  );
});
