"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _data = _interopRequireDefault(require("./data.js"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _path = _interopRequireDefault(require("path"));
var _config = require("./config.js");
var _userRouter = _interopRequireDefault(require("./routers/userRouter.js"));
var _orderRouter = _interopRequireDefault(require("./routers/orderRouter.js"));
var _productRouter = _interopRequireDefault(require("./routers/productRouter.js"));
var _uploadRouter = _interopRequireDefault(require("./routers/uploadRouter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_mongoose.default.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('connected');
}).catch(error => {
  console.log(error.reason);
});
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use('/api/uploads', _uploadRouter.default);
app.use('/api/users', _userRouter.default);
app.use('/api/products', _productRouter.default);
app.use('/api/orders', _orderRouter.default);
app.get('/api/paypal/clientId', (req, res) => {
  res.send({
    clientId: process.env.PAYPAL_CLIENT_ID
  });
});
app.use('/uploads', _express.default.static(_path.default.join(__dirname, '/../uploads')));
app.use(_express.default.static(_path.default.join(__dirname, '/../frontend')));
app.get('*', (req, res) => {
  res.sendFile(_path.default.join(__dirname, '/../frontend/index.html'));
});

/*
app.get('/api/products', (req, res) => {
res.send(data.products)
})
  
//api for --product id-//

app.get('/api/products/:id',(req, res)=>{
    const product=data.products.find((x)=>x._id === req.params.id)
    if (product){
res.send(product)

    }else{
        res.status(404).send({message:'product not found'})
    }
    
})

*/

app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({
    message: err.message
  });
});
app.listen(5000, () => {
  console.log('we are live at http://localhost:5000');
});