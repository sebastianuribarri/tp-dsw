import { Router, Express } from "express";
import UserController from "./user.controller.js";
import { authenticateUser } from "../../Shared/infrastructure/authenticate.js";
import { validateRecaptcha } from "./recaptcha.middleware.js";

export default class UsersRoutes {
  constructor(private userController: UserController, server: Express) {
    const userRouter = Router();
    server.use("/api/users", userRouter);

    // Rutas públicas (sin autenticación)
    userRouter.post(
      "/register",
      validateRecaptcha, // Validar reCAPTCHA antes de procesar el registro
      this.userController.register.bind(this.userController)
    );
    userRouter.post("/login", this.userController.login.bind(this.userController));

    // Middleware para proteger rutas
    userRouter.use(authenticateUser);

    // Rutas protegidas
    userRouter.get("/:id", this.userController.getOne.bind(this.userController));
    userRouter.delete("/:id", this.userController.deleteOne.bind(this.userController));
    userRouter.put("/follow", this.userController.followTeam.bind(this.userController));
    userRouter.put("/unfollow", this.userController.unfollowTeam.bind(this.userController));
    userRouter.put("/:id/password", this.userController.updatePassword.bind(this.userController));
    userRouter.put("/:id/change-plan", this.userController.updateSubscription.bind(this.userController));
  }
}
