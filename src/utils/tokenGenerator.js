const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (info, expiresIn = "24h") => {
  const token = jwt.sign(info, config.get("jwtPrivateKey"), {
    expiresIn: expiresIn,
  });
  return token;
};
