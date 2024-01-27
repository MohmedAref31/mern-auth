import expressAsyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utiles/errorHandler.js";
import { generateToken } from "../utiles/generateToken.js";
export const signup = expressAsyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });

  await user.save();

  res
    .status(201)
    .json({
      success: true,
      data: {
        email: user.email,
        _id: user._id,
        username: user.username,
        profilePicture: user.profilePicture,
      },
    });
});

export const signin = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // validate email and password existence
  if (!email || !password)
    return next(errorHandler("you must enter email and password", 400));

  let user = await User.findOne({ email });

  if (!user) return next(errorHandler("email or password is wrong!!", 401));

  const comparePassword = await bcryptjs.compare(password, user.password);

  if (!comparePassword)
    return next(errorHandler("email or password is wrong!!", 401));

  let token = generateToken({ id: user._id });

  res
    .cookie("access_tokenn", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      data: {
        email: user.email,
        _id: user._id,
        username: user.username,
        profilePicture: user.profilePicture,
      },
    });
});

export const google = expressAsyncHandler(async (req, res, next) => {
  console.log(req.body);
  let { username, email, profilePicture } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    // handle signin

    let token = generateToken({ id: user._id });

    return res
      .cookie("access_token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60),
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        data: {
          email: user.email,
          _id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        },
      });
  } else {
    username = (
      username.split(" ").join("") +
      Math.floor(Math.random() * 10000).toString()
    ).slice(0, 12);
    let password = Math.random().toString(32).slice(-8);
    console.log(username, password);
    const newUser = new User({ username, password, email, profilePicture });
    await newUser.save();
    res
      .cookie("access_tokenn", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60),
        httpOnly: true,
      })
      .status(201)
      .json({
        success: true,
        data: {
          email: newUser.email,
          _id: newUser._id,
          username: newUser.username,
          profilePicture: newUser.profilePicture,
        },
      });
  }
});

export const signout = expressAsyncHandler(async (req, res) => {
  res.clearCookie("access_token").send("sign out success");
});
