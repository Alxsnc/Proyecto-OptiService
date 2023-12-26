import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Rol = sequelize.define(
  "roles",
  {
    id_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_rol: {
      type: DataTypes.CHAR(100),
    },
  },
  {
    timestamps: false,
  }
);
