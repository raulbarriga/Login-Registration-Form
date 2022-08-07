import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// runs before every userModelName.save() call
// arrow functions don't provide a "this.something" scoped to the function
userSchema.pre("save", async function (next) {
  // isModified comes from mongoose
  // checks whether "password" is modified on the request
  // if it's not, breaks out of this function by calling next(), else continues to hash the modified password
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(12); 
// "this.password" is the modified sent password
// we reset "this.password" from a text password to be hashed/encrypted now
  this.password = await bcrypt.hash(this.password, salt); 
}); 

const User = mongoose.model("User", userSchema);

export default User;
