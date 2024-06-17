const mongoose = require("mongoose");

const ColeccionProyecto = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
    unique: true,
    minlength: [3, "El nombre debe tener minimo 3 caracteres"],
  },
  fecha: {
    type: Date,
    required: [true, "La fecha es requerida"],
  },
  estado: {
    type: String,
  },
});

const Proyecto = mongoose.model("proyecto", ColeccionProyecto);

module.exports = Proyecto;
