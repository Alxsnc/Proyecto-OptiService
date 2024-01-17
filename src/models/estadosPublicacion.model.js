import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const EstadoPubl = sequelize.define(
  "estados_publicacion",
  {
    id_estado_publicacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_estado_publicacion: {
      type: DataTypes.CHAR(255),
    },
  },
  {
    timestamps: false,
  }
);