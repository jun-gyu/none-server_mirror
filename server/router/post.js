const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello you're in post");
});

router.get("/second", (req, res) => {
  res.send("hello you're in postsecond");
});
module.exports = router;
