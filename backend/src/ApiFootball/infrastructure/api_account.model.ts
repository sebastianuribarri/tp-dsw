import { Schema, model } from "mongoose";
import {
  RequireNumber,
  RequireString,
} from "../../Shared/infrastructure/schema_types.js";

const apiAccountSchema = new Schema({
  mail: RequireString,
  password: RequireString,
  api_key: RequireString,
  remainingRequests: RequireNumber,
  resetTimeInSeconds: RequireNumber,
  endRequestTime: { type: Date, require: true, default: undefined },
});

const ApiAccountModel = model("api_accounts", apiAccountSchema);
export default ApiAccountModel;
