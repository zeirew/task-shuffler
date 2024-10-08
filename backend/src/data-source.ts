import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Task } from './entity/Task';
import * as dotenv from "dotenv";
import { Task1725296923818 } from './migration/1725296923818-task';

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [Task],
  migrations: [Task1725296923818],
});
