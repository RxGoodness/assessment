import { Joi } from "celebrate";

export const schema = {
  NODE_ENV: Joi.string()
    .default("development"),
  APP_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  PORT: Joi.number().default(5000),
  LOCAL_PORT: Joi.number().default(3003),
};
