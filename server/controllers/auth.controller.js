import expressAsyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utiles/errorHandler.js";
import { generateToken } from "../utiles/generateToken.js";
export const signup = expressAsyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });

  await user
    .save()
    .then(() => res.status(201).json({ success: true, data: user }))
    .catch((err) => next(errorHandler(err.message, 500)));
});

export const signin = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(errorHandler("email or password is wrong!!", 401));

  const comparePassword = await bcryptjs.compare(password, user.password);

  if (!comparePassword) return next(errorHandler("email or password is wrong!!", 401));

  let token = generateToken({ id: user._id });

  res
    .cookie("access_tokenn", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
    })
    .status(200)
    .json({ success: true, data: user });
});
