import { Router, Express } from "express";
import UserController from "./user.controller.js";
import { authenticateUser } from "../../Shared/infrastructure/authenticate.js";

export default class UsersRoutes {
  constructor(private userController: UserController, server: Express) {
    const userRouter = Router();
    server.use("/api/users", userRouter);

    // Rutas públicas (sin autenticación)
    userRouter.post("/register", userController.register);
    userRouter.post("/login", userController.login);

    // Middleware para proteger rutas
    userRouter.use(authenticateUser);

    // Rutas protegidas
    userRouter.get("/:id", userController.getOne);
    userRouter.delete("/:id", userController.deleteOne);
    userRouter.put("/follow", userController.followTeam);
    userRouter.put("/unfollow", userController.unfollowTeam);
    userRouter.put("/:id/password", userController.updatePassword);
    userRouter.put("/:id/change-plan", userController.updateSubscription);
  }
}
