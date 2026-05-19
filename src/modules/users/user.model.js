import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: true,
      minLength: [3, "Name must be more that 3 Chars"],
    },
    email: {
      type: String,
      requried: true,
      unique: true,
      trim: true,
      toLowerCase: true,
      validate: {
        validator: (v) => {
          return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  return (this.password = await bcrypt.hash(this.password, 12));
});

userSchema.method(
  "comparePassword",
  async function (hashedPassword, enterdPassword) {
    return await bcrypt.compare(enterdPassword, hashedPassword);
  },
);

export const UserModel = mongoose.model("User", userSchema);
