import { Schema } from "mongoose";

const playerSchema = new Schema({
    id: { type: Number, default: 0 },
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    number: { type: Number, default: 0 },
    position: { type: String, default: "" },
    });
export default playerSchema
