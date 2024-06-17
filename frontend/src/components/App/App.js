import Menu from "../Menu/Menu";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import FormNew from "../FormNew/FormNew";
import Login from "../FormLogin/FormLogin";

function App() {
  const [proyectos, setProyectos] = useState([]);
  const [login, setLogin] = useState(false);

  const iniciarSesion = () => {
    setLogin(true);
  };

  const cerrarSesion = () => {
    setLogin(false);
  };

  const todosProyectos = async () => {
    await fetch(`/api/proyectos`)
      .then((res) => res.json())
      .then((proyects) => {
        setProyectos(proyects);
      });
  };

  useEffect(() => {
    todosProyectos();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/menu"
          element={
            <Menu
              todosProyectos={todosProyectos}
              proyectos={proyectos}
              login={login}
              cerrarSesion={cerrarSesion}
            />
          }
        />

        <Route
          path="nuevoProyecto"
          element={<FormNew login={login} />}
        />

        <Route
          path="/"
          element={<Login iniciarSesion={iniciarSesion} />}
        />
      </Routes>
    </div>
  );
}

export default App;
