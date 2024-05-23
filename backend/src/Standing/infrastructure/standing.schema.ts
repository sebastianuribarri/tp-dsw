import { Schema, model } from "mongoose";

const standingSchema = new Schema({
  competition: { type: Number, require: true},
  team: {
      id: {type: Number , require: true},
      name: {type: String , require: true},
      logo: {type: String } 
     }
    ,
    points: {type: Number},
    
    goalsDiff: {type: Number},
    
    group: {type: String},

        description: {type: String},  
    
});

  const standingModel = model("standings", standingSchema);  
export default standingModel;