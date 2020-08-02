const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

//* 토큰 유무 & 토큰 해석.

function authCheck(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified; //{ user_id, userName, userEmail },
    next();
  } catch (err) {
    res.status(400).send("invalid Token");
  }
}

//* 토큰 생성.

function makeToken(user_id, userName, userEmail) {
  const accessToken = jwt.sign(
    { user_id: user_id, userName: userName, userEmail: userEmail },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return accessToken;
}

module.exports = { authCheck, makeToken };
