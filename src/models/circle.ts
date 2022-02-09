import Coordinate from "./coordinate";
export default class Circle {
  coordinate: Coordinate;
  r: number;
  constructor(coordinate: Coordinate, radius: number) {
    this.coordinate = coordinate;
    this.r = radius;
  }
  static getDistance(circleA: Circle, circleB: Circle): number {
    return Coordinate.getDistance(circleA.coordinate, circleB.coordinate);
  }
  static findIntersection(
    circleA: Circle,
    circleB: Circle
  ): [Coordinate | null, Coordinate | null] {
    if (Coordinate.isEqualCoordinate(circleA.coordinate, circleB.coordinate)) {
      return [null, null]; // Infinite intersection
    }
    const distance = this.getDistance(circleA, circleB);
    if (
      distance > circleA.r + circleB.r ||
      distance < Math.abs(circleA.r - circleB.r)
    ) {
      return [null, null]; // No interesection
    }
    const a =
      (circleA.r * circleA.r - circleB.r * circleB.r + distance * distance) /
      (2 * distance);
    const h = Math.sqrt(circleA.r * circleA.r - a * a);
    const coordinate2 = new Coordinate(
      circleA.coordinate.x +
        ((circleB.coordinate.x - circleA.coordinate.x) * a) / distance,
      circleA.coordinate.y +
        ((circleB.coordinate.y - circleA.coordinate.y) * a) / distance
    );
    const p1 = new Coordinate(
      coordinate2.x +
        (h * (circleB.coordinate.y - circleA.coordinate.y)) / distance,
      coordinate2.y -
        (h * (circleB.coordinate.x - circleA.coordinate.x)) / distance
    );
    const p2 = new Coordinate(
      coordinate2.x -
        (h * (circleB.coordinate.y - circleA.coordinate.y)) / distance,
      coordinate2.y +
        (h * (circleB.coordinate.x - circleA.coordinate.x)) / distance
    );
    return [p1, p2];
  }
  static findIntersectionOf3Circles(circles: Circle[]): Coordinate | null {
    const [coordinates1, coordinates2] = this.findIntersection(
      circles[0],
      circles[1]
    );
    const [coordinates3, coordinates4] = this.findIntersection(
      circles[0],
      circles[2]
    );
    if (
      coordinates1 === null ||
      coordinates2 === null ||
      coordinates3 === null ||
      coordinates4 === null
    )
      return null;
    if (Coordinate.isEqualCoordinate(coordinates1, coordinates3))
      return coordinates1;
    if (Coordinate.isEqualCoordinate(coordinates1, coordinates4))
      return coordinates1;
    if (Coordinate.isEqualCoordinate(coordinates2, coordinates3))
      return coordinates2;
    if (Coordinate.isEqualCoordinate(coordinates2, coordinates4))
      return coordinates2;
    return null;
  }
}
