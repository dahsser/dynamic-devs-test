import { Request, Response, Router } from "express";
import * as SatelliteController from "./controllers/satellite";
const router = Router();

router.get("/ping", async (req: Request, res: Response) => {
  res.send("pong");
});

router.post("/topsecret", SatelliteController.CalculateResultFromPayload);

router.post(
  "/topsecret_split/:satellite_name",
  SatelliteController.RegisterSatellite
);
router.get("/topsecret_split", SatelliteController.CalculateResultFromData);

export default router;
