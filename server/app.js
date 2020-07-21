const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv/config");
const PORT = 3000;

const postRoute = require("./router/post");

app.use("/post", postRoute);
app.get("/", (req, res) => {
  res.send("hello there");
});

//connect To DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("conneted to DB!");
});
//Listening to the server
app.listen(PORT, () => {
  console.log(`this server listen to ${PORT} port`);
});
