import Coordinate from "./coordinate";
export default class Circle {
  coordinate: Coordinate;
  radius: number;
  constructor(coordinate: Coordinate, radius: number) {
    this.coordinate = coordinate;
    this.radius = radius;
  }
  static getDistance(circleA: Circle, circleB: Circle): number {
    return Coordinate.getDistance(circleA.coordinate, circleB.coordinate);
  }
  static findIntersection(
    circleA: Circle,
    circleB: Circle
  ): [Coordinate, Coordinate | null] | null {
    if (Coordinate.isEqualCoordinate(circleA.coordinate, circleB.coordinate)) {
      return null; // Infinite intersection
    }
    const distance = this.getDistance(circleA, circleB);
    if(distance > circleA.radius + circleB.radius){
        return null; // No interesection
    }
    return null;
  }
  static findIntersectionOf3Circles(
    circles: [Circle, Circle, Circle]
  ): Coordinate | null {
    return null;
  }
}
