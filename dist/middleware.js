"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuth = exports.isAdmin = exports.generateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const generateToken = user => {
  return _jsonwebtoken.default.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, process.env.JWT_SECRET);
};
exports.generateToken = generateToken;
const isAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    res.status(401).send({
      message: 'token not generated'
    });
  } else {
    const token = bearerToken.slice(7, bearerToken.length);
    _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(404).send({
          message: 'invalid token'
        });
      } else {
        req.user = data;
        next();
      }
    });
  }
};
exports.isAuth = isAuth;
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status[401].send({
      message: 'token not valid for admin user'
    });
  }
};
exports.isAdmin = isAdmin;