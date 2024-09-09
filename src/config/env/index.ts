import dotenv from "dotenv";
import { schema } from "./schema";
import { Validate } from "./validators";
import { ConfigTypes } from "../types";
dotenv.config();

const envVarsSchema = Validate(schema);

const { error, value: envVariables } = envVarsSchema.validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);

export const config: ConfigTypes = {
  NODE_ENV: envVariables.NODE_ENV,
  APP_NAME: envVariables.APP_NAME,
  PORT: envVariables.PORT,
  LOCAL_PORT: envVariables.LOCAL_PORT,
  JWT_SECRET: envVariables.JWT_SECRET,
};
