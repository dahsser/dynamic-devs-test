import { Request, Response, Router } from "express";
import * as SatelliteController from "./controllers/satellite";
const router = Router();

router.get("/ping", async (req: Request, res: Response) => {
  res.send("pong");
});

router.post("/topsecret", SatelliteController.CalculateResultFromPayload);

export default router;
