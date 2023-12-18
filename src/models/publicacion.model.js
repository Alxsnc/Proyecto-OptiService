import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Publicacion = sequelize.define(
  "publicaciones",
  {
    id_publicacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.CHAR(10),
    },
    titulo: {
      type: DataTypes.CHAR(100),
    },
    descripcion: {
      type: DataTypes.CHAR(500),
    },
    pago: {
      type: DataTypes.CHAR(100),
    },
    fecha_publicacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);
