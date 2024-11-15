import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema({
  mail: { type: String, required: true, default: "" },
  password: { type: String, required: true, default: "" },
  premium: { type: Boolean, default: false },
  teams: { type: [Number], default: [] },
  username: { type: String, required: true, default: "" },
  id: { type: String, default: () => uuidv4(), unique: true },
});

const UserModel = model("users", userSchema);

export default UserModel;
