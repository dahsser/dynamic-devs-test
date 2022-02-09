import { NextFunction, Request, Response } from "express";
import {
  calculateResult,
  saveSatellite,
  calculateFromStorage,
} from "../service/satellite";
import * as ValidationSatellite from "../validations/satellite";
// Level 2
export const CalculateResultFromPayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { satellites } = req.body;
    const response = calculateResult(satellites);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

// Level 3
export const RegisterSatellite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { distance, message } = req.body;
    const { satellite_name: name } = req.params;
    try {
      const isValid = await ValidationSatellite.SatelliteSave.isValid({
        name,
        distance,
        message,
      });
      if (isValid) {
        const response = await saveSatellite({ name, distance, message });
        res.json(response);
      } else {
        res.status(400).json({ success: false });
      }
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const CalculateResultFromData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await calculateFromStorage();
    if (response === null) {
      res
        .status(400)
        .json({
          success: false,
          message:
            "Not enough information, satellites can't calculate where the cargoship is or message can't be decrypted",
        });
    } else {
      res.json(response);
    }
  } catch (err) {
    next(err);
  }
};
