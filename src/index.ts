import express from "express";
import dotenv from "dotenv"
import cors from "cors";
dotenv.config();

import routes from "./routes";
import errors from "./middlewares/errors";



const port = Number(process.env.PORT) || 8080;

const app = express();
app.use(express.json());
app.use(cors());
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
