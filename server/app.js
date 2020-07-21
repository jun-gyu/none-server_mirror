const express = require("express");
const mongoose = require("mongoose");
const app = express();

const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv/config");
//session 을 알아보자.
//*Route
const usersRoute = require("./router/users");

//*middle ware
/*
 * session(option)
 * secret - session hijacking을 막기위해 hash값에 추가로 들어가는 값 (Salt와 비슷한 개념)
 * resave - session을 언제나 저장할지 정하는 값
 * saveUninitialize: true - 세션이 저장되기 전에 uninitialized 상태로 만들어 저장
 */

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: [`http://localhost:${process.env.PORT}`],
    methods: ["GET", "POST", "PUT", "PATCH", "DELTE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//*router
app.use("/users", usersRoute);

//*get 요청 처리
app.get("/", (req, res) => {
  res.send("hello there");
});

//? loggin 활용. (postman 사용시)
app.use(morgan("dev"));

//*connect To DB
mongoose
  .connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log("conneted to DB!");
  })
  .catch((e) => console.error(e));

//*Listening to the server
app.listen(process.env.PORT, () => {
  console.log(`this server listen to ${process.env.PORT} port`);
});
