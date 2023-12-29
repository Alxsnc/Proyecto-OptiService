import app from "./app.js";
import { sequelize } from "./database/database.js";



async function main() {
  try {
    await sequelize.authenticate();
   await sequelize.sync( );
    console.log("La conexión con la base de datos se ha establecido correctamente.");

    var PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
      });
      
  } catch (error) {
    console.error("No se puede conectar a la base de datos:", error);
  }

}

main();