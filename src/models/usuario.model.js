import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Usuario = sequelize.define(
  "usuarios",
  {
    id_usuario: {
      type: DataTypes.CHAR(10),
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.CHAR(50),
    },
    apellido: {
      type: DataTypes.CHAR(50),
    },
    email: {
      type: DataTypes.CHAR(100),
    },
    password: {
      type: DataTypes.CHAR(300),
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

