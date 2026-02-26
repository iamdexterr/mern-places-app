import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const UsersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 8 },
    image: { type: String, required: true },
    places: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }],
  },
  { timestamps: true },
);
UsersSchema.plugin(uniqueValidator);

const User = mongoose.model("User", UsersSchema);

export default User;
