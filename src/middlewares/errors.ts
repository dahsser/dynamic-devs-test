import { Response, NextFunction, Router, Request } from "express";
import { Logger } from "../utils/Logger";
import httpStatus from "http-status";
const logger = new Logger("ErrorHandler");

export default function handleErrors(app: Router) {
  // Not Found
  app.use(function (req: Request, res: Response) {
    logger.debug("Not found", req.path);
    res.json({ success: false, code: "NOT_FOUND" });
  });

  // App Errors
  app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    if (err.message in httpStatus) {
      let response: any = {
        code: err.message,
        description: httpStatus[err.message],
      };
      logger.debug("User Error", err);
      res.status(err.message).json(response);
    } else {
      return next(err);
    }
  });

  app.use(function (err: Error, req: Request, res: Response) {
    let response: any = {
      code: "ERROR_500_SYSTEM",
      description: "Internal System Error",
    };
    logger.error("System Error", err);
    res.status(500).json(response);
  });
}
