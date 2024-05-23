import { Router, Express } from "express";
import UserController from "./user.controller.js";

export default class UsersRoutes {
    constructor(private userController: UserController, server: Express) {
        const userRouter = Router();
        server.use("/api/users", userRouter);

        userRouter.get("/:mail", userController.getOne);
        userRouter.post("/", userController.createOne);
        userRouter.delete("/:mail", userController.deleteOne);
    }
}