import { Schema } from "mongoose";
import {
  RequireNumber,
  RequireString,
} from "../../Shared/infrastructure/schema_types.js";

const eventSchema = new Schema({
  time: RequireNumber,
  team: {
    type: {
      id: RequireNumber,
      name: RequireString,
      logo: RequireString,
    },
    default: "",
  },
  player: {
    type: { id: RequireNumber, name: RequireString },
    default: { id: 0, name: "" },
  },
  assist: {
    type: { id: RequireNumber, name: RequireString },
    default: { id: 0, name: "" },
  },
  type: RequireString,
  detail: RequireString,
});
export default eventSchema;
