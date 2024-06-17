const { agregarUser, login } = require("../controllers/controllerUser.js");

const RouteUser = (app) => {
  app.post("/api/user/agregar", agregarUser);

  app.post("/api/user/verificar", login);
};

module.exports = RouteUser;