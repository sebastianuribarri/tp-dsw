import { Schema, model } from "mongoose";

import User from "../../User/domain/user.entity.js";
import Player from "../../Player/domain/player.entity.js";
import playerSchema from "../../Player/infrastructure/player.schema.js";

export const voteSchema = new Schema({
  match: { type: Number, require: true, default: 0 },
  user: { type: String, require: true, default: 0 },
  player: playerSchema,
});

voteSchema.index({ match: 1, user: 1 }, { unique: true });

const VoteModel = model("votes", voteSchema);

export default VoteModel;
