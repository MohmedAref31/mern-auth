import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import expressAsyncHandler from 'express-async-handler';


export const authentication = expressAsyncHandler(async (req, res, next)=>{
    const token = req.cookies.access_token;
    console.log(token)
    if(!token)
        return res.status(401).json({sccess:false,data:{ message:"please provide token"}})

    const verify = jwt.verify(token, process.env.JWT_SECERT);
    console.log(verify.id)
    if(!verify)
        return res.status(401).json({sccess:false, data:{message:"faild to verify token"}})

    const user = await User.findById({_id:verify.id})
    req.user = user
    next()

})