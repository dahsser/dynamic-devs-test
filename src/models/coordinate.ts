import { EPSILON } from "../utils/consts";

class Coordinate {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  static isEqualNumber(number1: number, number2: number): boolean {
    return Math.abs(number1 - number2) < EPSILON;
  }
  static isEqualCoordinate(coordA: Coordinate, coordB: Coordinate): boolean {
    return (
      Coordinate.isEqualNumber(coordA.x, coordB.x) &&
      Coordinate.isEqualNumber(coordA.y, coordB.y)
    );
  }
  static getDistance(coordA: Coordinate, coordB: Coordinate): number {
    return Math.sqrt(
      Math.abs(
        Math.pow(coordA.x - coordB.x, 2) + Math.pow(coordA.y - coordB.y, 2)
      )
    );
  }
}

export default Coordinate;
