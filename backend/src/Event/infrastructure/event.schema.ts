import {Schema } from "mongoose";

const eventSchema = new Schema ({
  time: { type:Number, default:0 },
  team: { type:String, default:"" },
  player: {type:{id:Number, name:String}, default:{id:0,name:""}},
  assist: {type:{id:Number, name:String}, default:{id:0,name:""}},
  type: {type:String, default:""},
  detail: {type:String, default: ""}
})
export default eventSchema
