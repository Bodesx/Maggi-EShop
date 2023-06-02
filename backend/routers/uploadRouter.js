import express from 'express'
import multer from "multer";
import{isAuth,isAdmin}from '../middleware'

const storage = multer.diskStorage({
    destination(req, file, callback)  {
    callback(null, 'uploads/')    
    },
    filename(req,file,callback){
        callback(null, `${Date.now()}.jpg`)
    }
})

const upload =multer({storage})
const uploadRouter=express.Router()

uploadRouter.post('/',isAuth,isAdmin, upload.single('image'),
(req,res)=>{
res.status(201).send({image:`/${req.file.path}`})
})

export default uploadRouter
