import Circle from "../src/models/circle";
import Coordinate from "../src/models/coordinate";

describe("Circle intersection", () => {
  it("should get intersections", async () => {
    const circle1 = new Circle(new Coordinate(-5, 0), 5 * Math.sqrt(2));
    const circle2 = new Circle(new Coordinate(5, 0), 5 * Math.sqrt(2));

    const [coord1, coord2] = Circle.findIntersection(circle1, circle2);
  });
  it("should get intersections - single point", async () => {
    const circle1 = new Circle(new Coordinate(-5, 0), 5);
    const circle2 = new Circle(new Coordinate(5, 0), 5);

    const [coord1, coord2] = Circle.findIntersection(circle1, circle2);
    expect(coord1).not.toBeUndefined();
    expect(coord1).not.toBeNull();
    expect(coord2).not.toBeNull();
    expect(coord1?.x).toBe(0);
    expect(coord1?.y).toBe(0);
    expect(coord2?.x).toBe(0);
    expect(coord2?.y).toBe(0);
  });
  it("should get triple intersection", async () => {
    const circle1 = new Circle(new Coordinate(-5, 0), 5);
    const circle2 = new Circle(new Coordinate(5, 0), 5);
    const circle3 = new Circle(new Coordinate(0, 5), 5);
    const coordinate = Circle.findIntersectionOf3Circles([
      circle1,
      circle2,
      circle3,
    ]);
    expect(coordinate).toBeDefined();
  });
  it("should get triple intersection - basic", async () => {
    const circle1 = new Circle(new Coordinate(0, 0), 5);
    const circle2 = new Circle(new Coordinate(-5, 5), 5);
    const circle3 = new Circle(new Coordinate(5, 5), 5);
    const coordinate = Circle.findIntersectionOf3Circles([
      circle1,
      circle2,
      circle3,
    ]);
    expect(coordinate).toBeDefined();
  });
});
