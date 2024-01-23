import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import allRouter from "./routes/index.js";


dotenv.config()
const app = express();

app.listen(process.env.PORT || 5000, () => {
  console.log(`app is listening on port ${process.env.PORT || 5000}`);

  mongoose
    .connect(process.env.DB_URI)
    .then((data) => console.log(`database connection established`))
    .catch((e) => console.log(e));
}); 


app.use(express.json());

//mount routes

app.use('/api', allRouter) 











// error handling 

app.use((err, req, res, next)=>{
    const {message, statusCode, status} = err;
    if(process.env.MODE === 'dev'){
        let {stack} = err;
        res.status(statusCode || 500).json({success:false, data:{
            message,
            statusCode,
            status,
            stack
        }})

    }else{ 
        res.status(statusCode || 500).json({success:false, data:{
            message,
            statusCode,
            status,
        }})
    }
})