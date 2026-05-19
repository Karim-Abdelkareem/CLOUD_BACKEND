import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONOG_URI);
    console.log("DB Connected!!!");
  } catch (err) {
    console.log(err.message);
  }
};
