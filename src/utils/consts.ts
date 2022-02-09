type Coord = [number, number];
export const SATELLITES: { [key: string]: Coord } = {
  KENOBI: [-500, -200],
  SKYWALKER: [100, -100],
  SATO: [500, 100],
};
export const SATELLITE_NAMES: { [key: string]: Coord } = {
  kenobi: SATELLITES.KENOBI,
  skywalker: SATELLITES.SKYWALKER,
  sato: SATELLITES.SATO,
};

export const EPSILON = 0.00001;
