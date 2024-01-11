import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

import { Rol } from "./rol.model.js";

export const UsuarioRol = sequelize.define(
  "usuarios_roles",
  {
    id_usuarios_roles: {
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

UsuarioRol.belongsTo(Rol, { foreignKey: 'id_rol', as: 'rol' });