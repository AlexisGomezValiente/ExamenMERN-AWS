import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import style from "./FormNew.module.css";

const FormNew = (props) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    fecha: "",
  });

  useEffect(() => {
    if (!props.login) navigate("/");
  }, []);

  const handleChange = (e) => {
    const id = e.target.id;
    const valor = e.target.value;
    setForm({ ...form, [id]: valor });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.nombre && form.fecha) {
      const pedido = await fetch(`${props.URL}/api/proyecto/agregar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (pedido.ok) {
        alert("Agregado con exito");
        navigate("/menu");
      } else {
        const pedidoJson = await pedido.json();
        alert(pedidoJson.message || pedidoJson.errorResponse.errmsg);
      }
    } else {
      alert("Debe completar los campos");
    }
  };

  return (
    <div className={style.container}>
      <div>
        <Link to={"/menu"} className={style.link}>
          <p>Volver al dashboard</p>
        </Link>
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <input type="text" id="nombre" placeholder="Nombre del proyecto" />
          <input type="date" id="fecha" placeholder="Fecha de vencimiento" />
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default FormNew;
