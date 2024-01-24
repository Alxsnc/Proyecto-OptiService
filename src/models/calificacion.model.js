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
    id_usuario_calificador: {
      type: DataTypes.INTEGER,
    },
    id_usuario_calificado: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
    createdAt: 'fecha_calificacion',
  }
);
