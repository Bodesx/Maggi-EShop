import express from 'express'
import cors from 'cors' 
import data from './data.js'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import path from 'path'
import { config } from './config.js'
import userRouter from './routers/userRouter.js'
import orderRouter from './routers/orderRouter.js'
import productRouter from './routers/productRouter.js'
import uploadRouter from './routers/uploadRouter';


mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true, useUnifiedTopology:true,}).then(()=>{
   console.log('connected') 
})
.catch((error)=>{
    console.log(error.reason)
})






const app=express()

app.use(cors())
app.use(bodyParser.json())
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter)
app.use('/api/products',productRouter)
app.use('/api/orders', orderRouter)


app.get('/api/paypal/clientId',(req,res)=>{
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/index.html'));
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

app.use((err,req,res,next)=>{
    const status = err.name && err.name ==='ValidationError'? 400 : 500;
    res.status(status).send({message: err.message})
})


app.listen(5000, ()=>{
    console.log('we are live at http://localhost:5000')
})