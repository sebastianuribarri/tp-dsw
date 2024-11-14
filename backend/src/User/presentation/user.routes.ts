import { Router, Express } from "express";
import UserController from "./user.controller.js";

export default class UsersRoutes {
  constructor(private userController: UserController, server: Express) {
    const userRouter = Router();
    server.use("/api/users", userRouter);

    // Obtener usuario por ID
    userRouter.get("/:id", userController.getOne);

    // Registrar usuario (ruta de registro)
    userRouter.post("/register", userController.register);

    // Eliminar usuario por ID
    userRouter.delete("/:id", userController.deleteOne);

    // Seguir a un equipo (ID usuario y ID equipo en body)
    userRouter.put("/follow", userController.followTeam);

    // Dejar de seguir a un equipo (ID usuario y ID equipo en body)
    userRouter.put("/unfollow", userController.unfollowTeam);

    // Iniciar sesión (ruta de login)
    userRouter.post("/login", userController.login);
  }
}
