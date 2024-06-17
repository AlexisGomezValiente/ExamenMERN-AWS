import React, { useState, useEffect } from "react";
import Table from "../Table/Table";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "./Menu.module.css";

const Menu = (props) => {
  const navigate = useNavigate();
  const [estados, setEstados] = useState({
    NUEVO: [],
    PROGRESO: [],
    COMPLETO: [],
  });

  const pedir = async (estado) => {
    try {
      const res = await fetch(`${props.URL}/api/proyecto/estado/${estado}`);
      const proyectos = await res.json();
      setEstados((prevEstados) => ({
        ...prevEstados,
        [estado]: proyectos,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const cambiarEstado = async (nombre) => {
    try {
      await fetch(`${props.URL}/api/proyecto/actualizar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre }),
      });
      await pedirTodosEstados();
      await props.todosProyectos();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const eliminarProyecto = async (nombre) => {
    await fetch(`${props.URL}/api/proyecto/eliminar/${nombre}`, {
      method: "DELETE",
    });
    await pedirTodosEstados();
    await props.todosProyectos();
    alert("Proyecto eliminado con exito");
  };

  const pedirTodosEstados = async () => {
    await pedir("NUEVO");
    await pedir("PROGRESO");
    await pedir("COMPLETO");
  };

  useEffect(() => {
    pedirTodosEstados();
  }, []);

  useEffect(() => {
    if (!props.login) navigate("/");
  }, [props.login]);

  return (
    <div className={style.container}>
      <div className={style.containerNav}>
        <h2 className={style.title}>Project Manager</h2>
        <button
          onClick={() => {
            props.cerrarSesion();
          }}
        >
          Cerrar Sesión
        </button>
      </div>
      <div className={style.tablas}>
        <Table
          titulo={"NUEVOS"}
          proyectos={estados.NUEVO}
          cambiarEstado={cambiarEstado}
          titleColor='orange'
          colorButon='blue'
          fondoProyecto='255, 244, 230'
        />
        <Table
          titulo={"PROGRESO"}
          proyectos={estados.PROGRESO}
          cambiarEstado={cambiarEstado}
          titleColor='blue'
          colorButon='green'
          fondoProyecto='211, 234, 255 '
        />
        <Table
          titulo={"COMPLETO"}
          proyectos={estados.COMPLETO}
          cambiarEstado={cambiarEstado}
          eliminarProyecto={eliminarProyecto}
          titleColor='green'
          colorButon='red'
          fondoProyecto='211, 255, 236'
        />
      </div>

      <Link to={"/nuevoproyecto"} className={style.link}>
        <p>Agregar nuevo proyecto</p>
      </Link>
    </div>
  );
};

export default Menu;
