import express from "express";
import routes from "./routes";
import errors from "./middlewares/errors";
import cors from 'cors';
const port = Number(process.env.PORT) || 8080;

const app = express();
app.enable("trust proxy");
app.disable("x-powered-by");

app.use(routes);

errors(app);

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
  throw new Error(error);
}
