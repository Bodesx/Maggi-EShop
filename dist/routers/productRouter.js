"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _productModel = _interopRequireDefault(require("../models/productModel"));
var _middleware = require("../middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const productRouter = _express.default.Router();
productRouter.get('/', (0, _expressAsyncHandler.default)(async (req, res) => {
  const searchKeyword = req.query.searchKeyword ? {
    name: {
      $regex: req.query.searchKeyword,
      $options: 'i'
    }
  } : {};
  const products = await _productModel.default.find({
    ...searchKeyword
  });
  res.send(products);
}));
productRouter.get('/:id', (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = await _productModel.default.findById(req.params.id);
  res.send(product);
}));
productRouter.post('/', _middleware.isAuth, _middleware.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = new _productModel.default({
    name: 'sample product',
    description: 'sample description',
    category: 'sample category',
    brand: 'sample brand',
    image: '/image/product-1.jpg'
  });
  const createdProduct = await product.save();
  if (createdProduct) {
    res.status(201).send({
      message: 'product created',
      product: createdProduct
    });
  } else {
    res.status(500).send({
      message: 'error in creating product'
    });
  }
}));
productRouter.put('/:id', _middleware.isAuth, _middleware.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const productId = req.params.id;
  const product = await _productModel.default.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      res.send({
        message: 'PRoDuCT UPDaTEd ',
        product: updatedProduct
      });
    } else {
      res.send(500).send({
        message: 'Error in UpDating PrOduCt'
      });
    }
  } else {
    res.send(404).send({
      message: 'PrOduCt nOT FoUnd'
    });
  }
}));
productRouter.delete('/:id', _middleware.isAuth, _middleware.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = await _productModel.default.findById(req.params.id);
  if (product) {
    const deletedProduct = await product.deleteOne();
    res.send({
      message: 'product is deleted ',
      product: deletedProduct
    });
  } else {
    res.status(404).send({
      message: 'Product not found'
    });
  }
}));
productRouter.post('/:id/reviews', _middleware.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = await _productModel.default.findById(req.params.id);
  if (product) {
    const review = {
      rating: req.body.rating,
      comment: req.body.comment,
      user: req.user._id,
      name: req.user.name
    };
    product.reviews.push(review);
    product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
    product.numReviews = product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      message: 'Comment Created.',
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1]
    });
  } else {
    throw Error('Product does not exist.');
  }
}));
var _default = productRouter;
exports.default = _default;