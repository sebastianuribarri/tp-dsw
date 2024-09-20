import { Schema } from "mongoose";
import { PlayerLineUp } from "../domain/lineup.entity.js";
import {
  RequireNumber,
  RequireString,
} from "../../Shared/infrastructure/schema_types.js";
import playerSchema from "../../Player/infrastructure/player.schema.js";

const lineUpSchema = new Schema({
  team: RequireNumber,
  formation: RequireString,
  starters: {
    type: [
      {
        id: RequireNumber,
        name: RequireString,
        number: RequireNumber,
        image: RequireString,
        position: RequireString,
        grid: {
          type: {
            x: { type: Number, default: null },
            y: { type: Number, default: null },
          },
        },
      },
    ],
    require: true,
    default: [],
  },
  substitutes: { type: [playerSchema], require: true, default: [] },
});
export default lineUpSchema;
