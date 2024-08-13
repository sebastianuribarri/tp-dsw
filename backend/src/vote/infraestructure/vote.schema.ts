import { Schema, model } from "mongoose";

import User from "../../User/domain/user.entity.js";
import Player from "../../Player/domain/player.entity.js";

export const voteSchema = new Schema({
  match: { type: Number, require: true, default: 0 },
  user: { type: Number, require: true, default: 0 },
  player: { type: Number, require: true, default: 0 },
});

const VoteModel = model("votes", voteSchema);

export default VoteModel;
