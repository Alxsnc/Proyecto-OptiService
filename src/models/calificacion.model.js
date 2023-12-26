import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Calificacion = sequelize.define(
  "calificaciones",
  {
    id_calificacion: {
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
    puntuacion: {
      type: DataTypes.INTEGER,
    },
    comentario: {
      type: DataTypes.CHAR(500),
    },
    fecha_calificacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);
