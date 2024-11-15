import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Definir el esquema de equipo
const teamSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  logo: { type: String, required: true },
});

// Esquema de usuario
const userSchema = new Schema({
  mail: { type: String, required: true, default: "" },
  password: { type: String, required: true, default: "" },
  premium: { type: Boolean, default: false },
  teams: { type: [teamSchema],required: true,  default: [] }, // El campo 'teams' es un arreglo de objetos 'teamSchema'
  username: { type: String, required: true, default: "" },
  id: { type: String, default: () => uuidv4(), unique: true }, // ID único por defecto
});

const UserModel = model("users", userSchema);

export default UserModel;
