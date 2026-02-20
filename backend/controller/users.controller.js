import { v4 as uuidv4 } from "uuid";
import AppError from "../utils/appError.js";

const USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    email: "max@schwarz.com",
    password: "123456",
  },
  {
    id: "u2",
    name: "John Doe",
    email: "john@doe.com",
    password: "123456",
  },
];

export const getUsers = (req, res, next) => {
  res
    .status(200)
    .json({ message: "Users retrieved successfully", data: USERS });
};

export const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  const user = USERS.find((user) => user.email === email);
  if (!user || user.password !== password) {
    const error = new AppError("Invalid credentials", 401);
    return next(error);
  }
  res.json({ message: "User logged in successfully" });
};

export const signupUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const isExistingUser = USERS.find((user) => user.email === email);
  if (isExistingUser) {
    const error = new AppError("User already exists", 400);
    return next(error);
  }
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  USERS.push(newUser);
  res.status(201).json({ message: "User signed up successfully" });
};
