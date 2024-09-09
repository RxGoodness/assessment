
import { DataSource } from "typeorm";
import { Product, User, Cart } from "../entities";


export const connectDB = new DataSource({
  type: "sqlite",
  database: "./ecommerce.db",
  synchronize: true,
  logging: true,
  entities: [User, Product, Cart],
  migrations: [],
  subscribers: [],
});