"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const orderSchema = new _mongoose.default.Schema({
  orderItems: [{
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    qty: {
      type: Number,
      required: true
    },
    product: {
      type: _mongoose.default.Schema.Types.ObjectId,
      ref: 'product',
      required: true
    }
  }],
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shipping: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  payment: {
    paymentMethod: String,
    paymentResult: {
      orderID: String,
      payerID: String,
      paymentID: String
    }
  },
  itemsPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: Date,
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  DeliveredAt: Date
}, {
  timestamps: true
});
const Order = _mongoose.default.model('Order', orderSchema);
var _default = Order;
exports.default = _default;