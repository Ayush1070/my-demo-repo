const jwt = require('jsonwebtoken')
// const { JsonWebTokenError } = require('jsonwebtoken')
const secret = "Ayush@2004"

function setUser(user) {
  return jwt.sign({
    _id: user._id,
    email: user.email,
    role: user.role
  }, secret)
}

function getUser(token) {
  // console.log(token);
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.log("Error varify token: " + err);
    return null;
  }
}
module.exports = {
  setUser,
  getUser,
}