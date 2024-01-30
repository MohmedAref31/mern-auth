import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import { errorHandler } from '../utiles/errorHandler.js';


export const updateUser = expressAsyncHandler(async (req, res, next)=>{
    const id = req.user._id;
    
    console.log(id);
    console.log(req.body)
    const updatedUser = await User.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true
    });
    if(!updatedUser)
        return next(errorHandler("An error occurred while updating the user", 500))

    const {password, ...rest} = updatedUser._doc;

    res.status(200).json({success:true, data:rest}); 
})
export const deleteUser = expressAsyncHandler(async (req, res, next)=>{
    const id = req.user._id;
    
    console.log(id);
    console.log(req.body)
    const deletedUser = await User.findByIdAndDelete(id);
    if(!deletedUser)
        return next(errorHandler("An error occurred while deleting the user", 500))

    res.status(200).json({success:true, data:{
        message: "User deleted successfully"
    }}); 
})