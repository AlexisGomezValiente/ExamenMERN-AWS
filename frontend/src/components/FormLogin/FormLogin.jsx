import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './FormLogin.module.css';

const Login = (props) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    pass: "",
    confirm: "",
  });

  const handleChange = (e) => {
    const id = e.target.id;
    const valor = e.target.value;
    setForm({ ...form, [id]: valor });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(e);

    if (!form.username || !form.pass || !form.confirm) {
      alert("Completa los campos");
    } else {
      if (form.confirm == form.pass) {
        const pedido = await fetch(`${props.URL}/api/user/agregar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (pedido.ok) {
          alert("User agregado");
          props.iniciarSesion();
          navigate("/menu");
        } else {
          const pedidoJson = await pedido.json();
          alert(pedidoJson.message || pedidoJson.errorResponse.errmsg);
        }
      } else {
        alert("La contraseña con coincide");
      }
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    if (!form.username || !form.pass) {
      alert("Completa los campos");
    } else {
      const pedido = await fetch(`${props.URL}/api/user/verificar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (pedido.ok) {
        alert("Login exitoso");
        props.iniciarSesion();
        navigate("/menu");
      } else {
        const pedidoJson = await pedido.json();
        alert(pedidoJson.message || pedidoJson.errorResponse.errmsg);
      }
    }
  };

  return (
    <div className={style.container}>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" placeholder="Username" id="username" />
        <input type="text" placeholder="Password" id="pass" />
        <input type="text" placeholder="Confirm password" id="confirm" />
        <button type="submit">Registrarse</button>
      </form>

      <form onChange={handleChange} onSubmit={handleSubmit2}>
        <h2>Login</h2>
        <input type="text" placeholder="Username" id="username" />
        <input type="text" placeholder="Password" id="pass" />
        <button type="submit">Iniciar Sesion</button>
      </form>
    </div>
  );
};

export default Login;
