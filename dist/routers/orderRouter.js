"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _middleware = require("../middleware");
var _orderModel = _interopRequireDefault(require("../models/orderModel"));
var _userModel = _interopRequireDefault(require("../models/userModel"));
var _productModel = _interopRequireDefault(require("../models/productModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const orderRouter = _express.default.Router();
orderRouter.get('/summary', _middleware.isAuth, _middleware.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const orders = await _orderModel.default.aggregate([{
    $group: {
      _id: null,
      numOrders: {
        $sum: 1
      },
      totalSales: {
        $sum: '$totalPrice'
      }
    }
  }]);
  const users = await _userModel.default.aggregate([{
    $group: {
      _id: null,
      numUsers: {
        $sum: 1
      }
    }
  }]);
  const dailyOrders = await _orderModel.default.aggregate([{
    $group: {
      _id: {
        $dateToString: {
          format: '%Y-%m-%d',
          date: '$createdAt'
        }
      },
      orders: {
        $sum: 1
      },
      sales: {
        $sum: '$totalPrice'
      }
    }
  }]);
  const productCategories = await _productModel.default.aggregate([{
    $group: {
      _id: '$category',
      count: {
        $sum: 1
      }
    }
  }]);
  res.send({
    users,
    orders: orders.length === 0 ? [{
      numOrders: 0,
      totalSales: 0
    }] : orders,
    dailyOrders,
    productCategories
  });
}));
orderRouter.get('/', _middleware.isAuth, _middleware.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const orders = await _orderModel.default.find({}).populate('user');
  res.send(orders);
}));
orderRouter.get('/mine', _middleware.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const orders = await _orderModel.default.find({
    user: req.user._id
  });
  res.send(orders);
}));
orderRouter.get('/:id', _middleware.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _orderModel.default.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({
      message: 'order not found'
    });
  }
}));
orderRouter.post('/', _middleware.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = new _orderModel.default({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice
  });
  const createdOrder = await order.save();
  res.status(201).send({
    message: 'new Order Created',
    order: createdOrder
  });
}));
orderRouter.delete('/:id', _middleware.isAuth, _middleware.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _orderModel.default.findById(req.params.id);
  if (order) {
    const deletedOrder = await order.deleteOne();
    res.send({
      message: 'Order  Deleted ',
      product: deletedOrder
    });
  } else {
    res.status(404).send({
      message: 'Order not found'
    });
  }
}));
orderRouter.put('/:id/pay', _middleware.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _orderModel.default.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment.paymentResult = {
      payerID: req.body.payerID,
      paymentID: req.body.paymentID,
      orderID: req.body.orderID
    };
    const updatedOrder = await order.save();
    res.send({
      message: 'Order paid',
      order: updatedOrder
    });
  } else {
    res.send(404).send({
      message: 'order not found'
    });
  }
}));
var _default = orderRouter;
exports.default = _default;