import style from "./Table.module.css";

const Table = (props) => {
  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th style={{ backgroundColor: props.titleColor }}>{props.titulo}</th>
        </tr>
      </thead>

      <tbody>
        {props.proyectos.map((proyect) => {
          // Convert the ISO date string to a Date object
          const date = new Date(proyect.fecha);
          // Format the date to "YYYY-MM-DD"
          const formattedDate = date.toLocaleDateString('en-CA'); // 'en-CA' produces the format "YYYY-MM-DD"
          return (
            <tr key={proyect._id}>
              <td>
                <div className={style.proyecto} style={{ backgroundColor: `rgb(${props.fondoProyecto})` }}>
                  <h2>{proyect.nombre}</h2>
                  <p>Due: {formattedDate}</p>
                  <button
                    style={{ backgroundColor: props.colorButon }}
                    onClick={() => {
                      if (proyect.estado != "COMPLETO") {
                        props.cambiarEstado(proyect.nombre);
                      } else {
                        props.eliminarProyecto(proyect.nombre);
                      }
                    }}
                  >
                    {proyect.estado == "NUEVO"
                      ? "MOVER A PROGRESO"
                      : proyect.estado == "PROGRESO"
                      ? "MOVER A COMPLETO"
                      : "ELIMINAR"}
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
