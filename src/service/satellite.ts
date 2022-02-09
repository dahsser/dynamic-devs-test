import Circle from "../models/circle";
import Coordinate from "../models/coordinate";
import { getMessage } from "../utils/calcMessage";
import { SATELLITE_NAMES } from "../utils/consts";
import round from "lodash/round";
type SatellitePosition = {
  name: string;
  distance: number;
  message: string[];
};
export const calculateResult = (satellites: SatellitePosition[]) => {
  const circles = satellites.map((sat: SatellitePosition) => {
    return new Circle(
      new Coordinate(
        SATELLITE_NAMES[sat.name][0],
        SATELLITE_NAMES[sat.name][1]
      ),
      sat.distance
    );
  });
  const messages = satellites.map((sat: SatellitePosition) => sat.message);
  const intersection = Circle.findIntersectionOf3Circles(circles);
  const finalMessage = getMessage(messages);
  if (intersection !== null && finalMessage !== "") {
    return {
      position: {
        x: round(intersection.x, 4),
        y: round(intersection.y, 4),
      },
      message: finalMessage,
    };
  } else {
    throw new Error("404");
  }
};
