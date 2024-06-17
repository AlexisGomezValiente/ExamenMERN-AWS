const Proyecto = require("../models/modelProyecto.js");
const { parse, format, isValid } = require("date-fns");

const agregarProyecto = (req, res) => {
  const { nombre, fecha } = req.body;

  const parsedFecha = parse(fecha, "yyyy-MM-dd", new Date());

  if (!isValid(parsedFecha)) {
    return res.status(400).json({ error: "Fecha inválida" });
  }

  const formattedFecha = format(parsedFecha, "yyyy-MM-dd");

  Proyecto.create({ nombre, estado: "NUEVO", fecha: formattedFecha })
    .then((proyectoCreado) => res.status(201).json(proyectoCreado))
    .catch((err) => res.status(500).json(err));
};


const verProyectos = (req, res) => {
  Proyecto.find()
    .then((proyectos) => res.status(200).json(proyectos))
    .catch((err) => res.status(500).json(err));
};

const cambiarEstado = (req, res) => {
  const { nombre } = req.body;

  Proyecto.findOne({ nombre })
    .then((proyectoEncontrado) => {
      if (!proyectoEncontrado)
        return res.status(404).json({ message: "Proyecto no encontrado" });

      if (proyectoEncontrado.estado == "COMPLETO")
        return res
          .status(406)
          .json({ message: "Ya no se puede cambiar, ya esta completo" });

      if (proyectoEncontrado.estado == "NUEVO") {
        proyectoEncontrado.estado = "PROGRESO";
        return proyectoEncontrado
          .save()
          .then((actualizacion) => res.status(200).json(actualizacion))
          .catch((err) => res.status(500).json(err));
      }

      if (proyectoEncontrado.estado == "PROGRESO") {
        proyectoEncontrado.estado = "COMPLETO";
        return proyectoEncontrado
          .save()
          .then((actualizacion) => res.status(200).json(actualizacion))
          .catch((err) => res.status(500).json(err));
      }
    })
    .catch((err) => res.status(500).json(err));
};

const deleteProyecto = (req, res) => {
  const { nombre } = req.params;

  Proyecto.deleteOne({ nombre })
    .then(() => res.status(200).end())
    .catch((err) => res.status(200).json(err));
};

const pedirPorEstado = (req, res) => {
  const { estado } = req.params;

  Proyecto.find({ estado })
    .then((proyectos) => {
      if (!proyectos)
        return res
          .status(404)
          .json({ message: "NO existe proyectos con ese estado" });

      return res.status(200).json(proyectos);
    })
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  agregarProyecto,
  verProyectos,
  cambiarEstado,
  deleteProyecto,
  pedirPorEstado,
};
