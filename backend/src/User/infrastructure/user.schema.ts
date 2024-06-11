import { Schema, model } from "mongoose";

const userSchema = new Schema({
  mail: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  premium: { type: Boolean },
  teams: {type: Array},
});

const UserModel = model("users", userSchema);

export default UserModel;