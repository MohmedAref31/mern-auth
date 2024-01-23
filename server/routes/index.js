import express from 'express';
import {errorHandler} from '../utiles/errorHandler.js';
import authRoutes from './auth.route.js';

const allRouter = express.Router();



allRouter.use('/auth',authRoutes )




allRouter.use('*',(req, res, next)=>{
    next(errorHandler("sorry this endpoint is not exist", 404))
})


export default allRouter