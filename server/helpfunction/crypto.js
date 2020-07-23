const crypto = require("crypto");

function convertHash(password) {
  const hash = crypto.createHash(`sha256`);
  hash.update(password);
  let hash_password = hash.digest("hex");
  return hash_password;
}
module.exports = convertHash;
