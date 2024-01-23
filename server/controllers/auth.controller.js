import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { errorHandler } from "../utiles/errorHandler.js";

export const signup = expressAsyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
    console.log(username, email, password);
  const user = new User({username, email, password});

  await user
    .save()
    .then(() => res.status(201).json({ success: true, data: user }))
    .catch((err) => next(errorHandler(err.message, 500)));
});
