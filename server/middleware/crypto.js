const crypto = require("crypto");

function convertHash(passWord) {
  const hash = crypto.createHash(`sha256`);
  hash.update(passWord);
  let hash_passWord = hash.digest("hex");
  return hash_passWord;
}
module.exports = convertHash;
