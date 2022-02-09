import Circle from "../models/circle";
import Coordinate from "../models/coordinate";
import Satellite from "../models/satellite";
import { getMessage } from "../utils/calcMessage";
import { SATELLITE_NAMES } from "../utils/consts";
import round from "lodash/round";
import isEmpty from "lodash/isEmpty";

// level 2
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

// Level 3

export const saveSatellite = async ({
  name,
  distance,
  message,
}: SatellitePosition) => {
  const satellite = new Satellite(name, distance, message);
  await satellite.save();
};

export const calculateFromStorage = async () => {
  let satellites = await Satellite.getAll();
  const circles = satellites.map((sat) => {
    return new Circle(
      new Coordinate(sat.coordinate_x, sat.coordinate_y),
      sat.radius
    );
  });
  const messages = satellites.map((sat) => sat.message);
  if (circles.some((circle) => circle.r === null) || messages.some(isEmpty)) {
    return null;
  }
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
