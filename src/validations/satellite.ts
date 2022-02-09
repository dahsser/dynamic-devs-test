import * as yup from 'yup';

export const SatelliteSave = yup.object().shape({
  name: yup.string().oneOf(["kenobi", "skywalker", "sato"]).required(),
  distance: yup.number().positive().required(),
  message: yup.array().of(yup.string()).required(),
});
