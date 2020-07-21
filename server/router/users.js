const express = require("express");
const router = express.Router();
const Users = require("../models/Users");

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  let { username, userid, provider } = req.body;
  const user = new Users({
    username: username,
    userid: userid,
    provider: provider,
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
