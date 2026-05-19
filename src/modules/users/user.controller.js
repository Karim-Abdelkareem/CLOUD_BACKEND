import { UserModel } from "./user.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsync } from "async-handler-express";

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user || !(await user.comparePassword(user.password, password))) {
    return next(new AppError("INVALID_CREDENTIALS", 401));
  }
  res.status(200).json({
    success: true,
    message: "LOGIN_SUCCESSFUL",
    user,
  });
});

export const createUser = catchAsync(async (req, res, next) => {
  const { fullname, email, password, role } = req.body;
  const user = await UserModel.create({
    fullname,
    email,
    password,
    role,
  });
  res.status(201).json({
    success: true,
    message: "USER_CREATED_SUCCESSFULLY",
    user,
  });
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await UserModel.find();
  res.status(200).json({
    success: true,
    message: "USERS_FETCHED_SUCCESSFULLY",
    users,
  });
});

export const getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) {
    return next(new AppError("USER_NOT_FOUND", 404));
  }
  res.status(200).json({
    success: true,
    message: "USER_FETCHED_SUCCESSFULLY",
    user,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { fullname, email, password, role } = req.body;
  const user = await UserModel.findByIdAndUpdate(
    id,
    {
      fullname,
      email,
      password,
      role,
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
  if (!user) {
    return next(new AppError("USER_NOT_FOUND", 404));
  }
  res.status(200).json({
    success: true,
    message: "USER_UPDATED_SUCCESSFULLY",
    user,
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) {
    return next(new AppError("USER_NOT_FOUND", 404));
  }
  res.status(200).json({
    success: true,
    message: "USER_DELETED_SUCCESSFULLY",
  });
});
