import mongoose, { mongo } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: [4, "username must be at least 4 characters"],
      maxLength: [12, "username must be at most 12 characters"],
      required: [true, "username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is already exist"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
      minLength: [6, "username must be at least 6 characters"],
      maxLengh: [18, "username must be at least 18 characters"],
    },
    profilePicture: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcryptjs.hash(user.password, 10);
  }
});

userSchema.pre('findOneAndUpdate',async function () {
  const updatedPassword = this._update.password;
  console.log(this._update)
  // console.log(this);
  if (updatedPassword ) {
    this._update.password = await bcryptjs.hash(updatedPassword, 10);
  }
} )

// userSchema.statics.hashPassword = async function(){

// }

const User = mongoose.model("User", userSchema);

export default User;
