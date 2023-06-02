"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const reviewSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 5
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
const productSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0.0,
    required: true
  },
  countInStock: {
    type: Number,
    default: 0.0,
    required: true
  },
  rating: {
    type: Number,
    default: 0.0,
    required: true
  },
  numReviews: {
    type: Number,
    default: 0,
    required: true
  },
  reviews: [reviewSchema]
}, {
  timeStamps: true
});
const Product = _mongoose.default.model('Product', productSchema);
var _default = Product;
exports.default = _default;