import pool from "../config/pg";
import Coordinate from "./coordinate";

import { SATELLITE_NAMES } from "../utils/consts";
class Satellite {
  name: string;
  coordinates: Coordinate;
  radius: number;
  message: string[];
  constructor(name: string, radius: number, message: string[]) {
    this.name = name;
    this.coordinates = new Coordinate(
      SATELLITE_NAMES[name][0],
      SATELLITE_NAMES[name][1]
    );
    this.radius = radius;
    this.message = message;
  }
  async save() {
    const query = {
      text: `UPDATE satellite 
            set coordinate_x =$2,coordinate_y = $3, radius = $4, message = $5 
            WHERE name = $1`,
      values: [
        this.name,
        this.coordinates.x,
        this.coordinates.y,
        this.radius,
        this.message,
      ],
    };
    await pool.query(query);
  }
  static async getAll() {
    const query = {
      text: "SELECT * FROM satellite",
    };
    const satellites = await pool.query(query);
    return satellites.rows;
  }
}

export default Satellite;
