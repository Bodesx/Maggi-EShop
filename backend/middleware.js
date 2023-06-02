import jwt from 'jsonwebtoken'



export const generateToken = (user)=>{
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
}, 

process.env.JWT_SECRET

)
 
}

export const isAuth = (req, res, next )=>{
    const bearerToken = req.headers.authorization
    if(!bearerToken) {
        res.status(401).send({message:'token not generated'})
    }else{
       const token =bearerToken.slice(7, bearerToken.length) 
       jwt.verify(token, process.env.JWT_SECRET, (err,data)=>{
        if(err){
            res.status(404).send({message:'invalid token'})
        }else{
            req.user=data
            next()
        }

       })
    }
}

export const isAdmin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status[401].send({message:'token not valid for admin user'})
    }
}

