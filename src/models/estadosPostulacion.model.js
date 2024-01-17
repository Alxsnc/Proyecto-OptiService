import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const EstadoPostulacion = sequelize.define(
  "estados_postulacion",
  {
    id_estado_postulacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_estado_postulacion: {
      type: DataTypes.CHAR(255),
    },
  },
  {
    timestamps: false,
  }
);