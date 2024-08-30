import { model, Schema } from "mongoose";

export const ApiAccountSchema = new Schema({
  mail: { type: String, require: true, default: "" },
  password: { type: String, require: true, default: "" },
  api_key: { type: String, require: true, default: "" },
  day_requests: { type: Number, require: true, default: 0 },
});

const ApiAccountModel = model("api_accounts", ApiAccountSchema);

export default ApiAccountModel;
