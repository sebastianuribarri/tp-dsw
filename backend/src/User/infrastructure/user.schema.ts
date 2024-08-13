import { Schema, model } from "mongoose";


const userSchema = new Schema({
  mail: { type: String, require: true, default: "" },
  password: { type: String, require: true, default: "" },
  premium: { type: Boolean, default: false },
  teams: {type:[Number], default:[]},
  username: {type:String, require: true, default: "" },
  id: {type:String, default: "" }
});

const UserModel = model("users", userSchema);

export default UserModel;