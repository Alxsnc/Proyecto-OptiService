import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const UsuarioRol = sequelize.define(
  "usuarios_roles",
  {
    id_usuario_rol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuario: {
      type: DataTypes.CHAR(10),
    },
    id_rol: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);
