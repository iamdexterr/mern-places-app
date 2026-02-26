import AppError from "../utils/appError.js";
import User from "../models/users.model.js";
import Place from "../models/places.model.js";
import mongoose from "mongoose";

export const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new AppError("Something went wrong", 500);
    console.log(err);
    return next(error);
  }
  res.status(200).json({
    message: "Users retrieved successfully",
    data: users.map((user) => user.toObject({ getters: true })),
  });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      const error = new AppError("Invalid credentials", 401);
      return next(error);
    }
  } catch (err) {
    const error = new AppError("Something went wrong", 500);
    console.log(err);
    return next(error);
  }

  res.json({ message: "User logged in successfully" });
};

export const signupUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  // const isExistingUser = USERS.find((user) => user.email === email);
  try {
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      const error = new AppError("User already exists", 400);
      return next(error);
    }
  } catch (er) {
    const error = new AppError("Something went wrong", 500);
    console.log(err);
    return next(error);
  }
  const user = new User({
    name,
    email,
    password,
    image: "https://example.com/default-profile.png",
    places: [],
  });
  try {
    await user.save();
  } catch (err) {
    const error = new AppError("Something went wrong", 500);
    console.log(err);
    return next(error);
  }
  res.status(201).json({
    message: "User signed up successfully",
    data: user.toObject({ getters: true }),
  });
};

export const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;
  let user;

  try {
    user = await User.findById(userId);
    if (!user) {
      const error = new AppError(
        "Could not find a user for the provided id.",
        404,
      );
      return next(error);
    }
  } catch (error) {
    const err = new AppError("Something went wrong", 500);
    console.log(error);
    return next(err);
  }
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Place.deleteMany({ creator: userId }, { session });
    await user.deleteOne({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    const err = new AppError("Could not delete user.", 500);
    console.log(error);
    return next(err);
  }
};
