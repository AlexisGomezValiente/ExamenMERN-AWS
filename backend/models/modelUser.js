const mongoose = require("mongoose");

const ColeccionUser = mongoose.Schema({
  username: {
    type: String,
    required: [true, "El nombre de usuario es requerido"],
    unique: true,
  },
  pass: {
    type: String,
    required: [true, "La contraseña es requerida"],
  },
});

const User = mongoose.model('usuarios', ColeccionUser);

module.exports = User;