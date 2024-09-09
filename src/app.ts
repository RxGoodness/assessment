import { connectDB } from "./config/database";
import express from "express";
const app = express();
import { config } from "./config/env";
import indexRouter from './routes/index';

const { APP_NAME } = config;

app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.json({ limit: "100mb" }));

app.use('/', indexRouter);

app.use("/", async (req, res) => {
  res.status(200).send({
    message: `hi ${APP_NAME} here, 👋`,
  });
});

export default app;
