require("./config/conexion.js");

const express = require("express");
const app = express();
const cors = require("cors");
const RouteProyecto = require("./routes/routeProyecto.js");
const RouteUser = require("./routes/routeUser.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


RouteProyecto(app);
RouteUser(app);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listen port: ${PORT}`);
});
