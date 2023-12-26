import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Postulacion = sequelize.define(
  "postulaciones",
  {
    id_postulacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.CHAR(10),
    },
    id_publicacion: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);
