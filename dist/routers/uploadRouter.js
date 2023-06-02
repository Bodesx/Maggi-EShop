"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _middleware = require("../middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const storage = _multer.default.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}.jpg`);
  }
});
const upload = (0, _multer.default)({
  storage
});
const uploadRouter = _express.default.Router();
uploadRouter.post('/', _middleware.isAuth, _middleware.isAdmin, upload.single('image'), (req, res) => {
  res.status(201).send({
    image: `/${req.file.path}`
  });
});
var _default = uploadRouter;
exports.default = _default;