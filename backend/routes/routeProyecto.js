const {
  agregarProyecto,
  verProyectos,
  cambiarEstado,
  deleteProyecto,
  pedirPorEstado,
} = require("../controllers/controllerProyecto.js");

const RouteProyecto = (app) => {
  app.post("/api/proyecto/agregar", agregarProyecto);

  app.get("/api/proyectos", verProyectos);
  app.get("/api/proyecto/estado/:estado", pedirPorEstado);

  app.put("/api/proyecto/actualizar", cambiarEstado);

  app.delete("/api/proyecto/eliminar/:nombre", deleteProyecto);
};

module.exports = RouteProyecto;
