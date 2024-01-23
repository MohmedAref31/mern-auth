export const errorHandler = (msg, code)=>{
    const err = new Error();
    err.message = msg || "something went wrong!!";
    err.statusCode = code || 500;
    err.status = err.statusCode >=500?"error":err.statusCode >= 400?"fail":"success";
    return err
}