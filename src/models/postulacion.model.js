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
    id_publicacion: {
      type: DataTypes.INTEGER,
    },
    id_estado_postulacion: {
      type: DataTypes.INTEGER,
    },
    id_empleado: {
      type: DataTypes.INTEGER
    },
  },
  {
    timestamps: false,
  }
);
