import { Request, Response, Router } from "express";
import * as SatelliteController from "./controllers/satellite";
const router = Router();

router.get("/ping", async (req: Request, res: Response) => {
  res.send("pong");
});

/**
 * @api {post} /topsecret Calculate based on payload
 * @apiName CalculateResultFromPayload
 *
 * @apiExample Example usage:
 *     endpoint: https://orcebot.uc.r.appspot.com/topsecret/
 *
 *    {
 *      "satellites": [
 *      {  
 *        "name": "kenobi",
 *        "distance": 538.5164807134504,
 *        "message": ["this", "", "", "","message"]
 *      },
 *      {
 *        "name": "skywalker",
 *        "distance": 141.421356,
 *        "message": [ "", "is", "", "secret", ""]
 *      },
 *      { 
 *        "name": "sato",
 *        "distance": 509.90195,
 *        "message": [ "this", "", "a", "", ""]
 *      }
 *     ]
 *   }
 *
 * @apiSuccess {Object} position
 * @apiSuccess {Number} position.x
 * @apiSuccess {Number} position.y
 * @apiSuccess {String} message 
 */

router.post("/topsecret", SatelliteController.CalculateResultFromPayload);

/**
 * @api {post} /topsecret_split/:satellite_name Save satellite information
 * @apiName RegisterSatellite
 * @apiParam {Number} satellite_name Satellite's name.
 * @apiExample Example usage:
 *     endpoint: https://orcebot.uc.r.appspot.com/topsecret_split/:satellite_name
 *
 *      {  
 *        "name": "kenobi",
 *        "distance": 538.5164807134504,
 *        "message": ["this", "", "", "","message"]
 *      }
 *
 * @apiSuccess {Boolean} success operations success.
 */

router.post(
  "/topsecret_split/:satellite_name",
  SatelliteController.RegisterSatellite
);

/**
 * @api {get} /topsecret_split Calculate based on satellite data stored
 * @apiName CalculateResultFromData
 *
 * @apiSuccess {Object} position
 * @apiSuccess {Number} position.x
 * @apiSuccess {Number} position.y
 * @apiSuccess {String} message 
 */
router.get("/topsecret_split", SatelliteController.CalculateResultFromData);

export default router;
