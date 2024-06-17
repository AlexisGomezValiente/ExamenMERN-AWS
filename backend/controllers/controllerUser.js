const User = require("../models/modelUser.js");

const agregarUser = (req, res) => {
  const user = {
    username: req.body.username,
    pass: req.body.pass,
  };

  if (!user.username || !user.pass)
    return res.status(406).json({ message: "Debe de llenar los campos" });

  User.create(user)
    .then((userCreado) => res.status(201).json(userCreado))
    .catch((err) => res.status(500).json(err));
};

const login = (req, res) => {
  const { username, pass } = req.body;

  User.findOne({ username, pass })
    .then((userEncontrado) => {
      if (!userEncontrado)
        return res.status(404).json({ message: "No encontrado" });

      return res.status(200).json({ encontrado: true });
    })
    .catch((err) => res.status(500).json({ encontrado: false, err }));
};

module.exports = {
  agregarUser,
  login,
};
