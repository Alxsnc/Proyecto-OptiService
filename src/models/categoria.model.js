import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Categoria = sequelize.define(
  "categorias",
  {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoria: {
      type: DataTypes.CHAR(255),
    },
  },
  {
    timestamps: false,
  }
);
