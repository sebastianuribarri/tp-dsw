import { Router } from 'express'

export const router = Router();


export class LeagueRoutes {
    constructor(LeagueController) {
        this.LeagueController = LeagueController;
        router.get("/", LeagueController.getAll());
        router.get("/:id", LeagueController.getOne());
        router.get("/", LeagueController.create());
        router.get("/:id", LeagueController.update());
        router.get("/:id", LeagueController.delete());
    }
}
