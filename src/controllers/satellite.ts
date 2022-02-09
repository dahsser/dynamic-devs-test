import { NextFunction, Request, Response } from "express";
import { calculateResult } from "../service/satellite";
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
export const RegisterSatellite = (req: Request, res: Response) => {};

export const CalculateResultFromData = (req: Response, res: Response) => {};
