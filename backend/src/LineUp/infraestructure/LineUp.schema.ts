import { Schema } from "mongoose";
import { PlayerLineUp } from "../domain/lineup.entity.js";

const lineUpSchema = new Schema ({
    team: {type:Number, default: 0},
    formation: {type:String, default: ""},
    starters: {type:{
        id: {type:Number, default: 0},
        name: {type:String, default: ""},
        number: {type:Number, default: 0},
        image : {type:String, default: ""},
        position: {type: String, default: ""},
        grid : {type: {x: {type:Number, default: 0},
    y: {type:Number, default: 0}} },
    }, },
    subtitutes: {type:{
        id: {type:Number, default: 0},
        name: {type:String, default: ""},
        number: {type:Number, default: 0},
        image : {type:String, default: ""},
        position: {type: String, default: ""},
        grid : {type: String , default: ""},
    },}
})
export default lineUpSchema
