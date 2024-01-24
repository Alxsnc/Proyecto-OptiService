import Sequelize from "sequelize";
import '../loadEnv.js';

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      "useUTC": false, 
    },
    timezone: 'America/Guayaquil',

  }
);
