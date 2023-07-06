import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      index: true,
      dropDups: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required."],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);
  next();
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
