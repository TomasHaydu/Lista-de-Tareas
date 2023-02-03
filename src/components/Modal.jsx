import Regresar from "../img/regresar.png";
import Delete from "../img/delete.png";

const Modal = ({ tarea, setUnaTarea, eliminarTarea, realizadasToTareas }) => {
  const handleDelete = () => {
    const response = confirm("Desea ELIMINAR esta tarea?");

    if (response) {
      eliminarTarea(tarea.id);
    }

    setUnaTarea({});
  };

  const handleRegresar = (id) => {
    const response = confirm(
      "Desea REGRESAR esta tarea REALIZADA a la lista de tareas?"
    );

    if (response) {
      realizadasToTareas(id);
    }
  };

  const dayNow = () => {
    let date = new Date();
    let day = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
    let month =
      date.getMonth() + 1 < 9
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let year = date.getFullYear();
    if (month < 10) {
      return `${day}-0${month}-${year}`;
    } else {
      return `${day}-${month}-${year}`;
    }
  };

  const dayMonthYear = (fecha) => {
    const [year, month, day] = fecha.split("-");

    const result = [day, month, year].join("-");

    return result;
  };

  return (
    <div className="bg-gray-400 mx-10 h-full my-2 md:max-h-96 ">
      <div className="ml-4 flex flex-col items-start md:flex md:flex-row md:items-center md:justify-between">
        <p className="underline">Titulo: </p>
        <span className="normal-case text-base no-underline w-56 flex md:flex-grow md:max-w-xs md:w-96 max-h-12 ml-8 md:ml-2 overflow-y-auto">
          {tarea.titulo}
        </span>

        <p className="underline">Descripcion: </p>
        <span className="normal-case md:ml-2 text-base w-56 flex-grow md:flex-grow md:max-w-xs md:w-96 max-h-12 overflow-y-auto ">
          {tarea.descripcion}
        </span>

        <p className="md:ml-2 underline md:w-80">Fecha limite: </p>
        <span className=" normal-case text-base md:w-60 md:flex ">
          {dayMonthYear(tarea.fecha) === dayNow()
            ? "HOY"
            : dayMonthYear(tarea.fecha)}
        </span>

        <p className="md:ml-2 mb-2 underline md:w-80">Importancia: </p>
        <span
          className={
            tarea.importancia == "1"
              ? "bg-sky-300 font-bold p-1 mx-8 text-base md:ml-2 md:p-1.5 rounded-xl text-black uppercase"
              : tarea.importancia == "2"
              ? "bg-amber-300 font-bold text-base ml-2 p-1.5 rounded-xl text-black uppercase"
              : "bg-red-400 font-bold text-base ml-2 p-1.5 rounded-xl text-black uppercase"
          }
        >
          {tarea.importancia == 1
            ? "bajo"
            : tarea.importancia == 2
            ? "medio"
            : "alto"}
        </span>

        <div className="flex justify-around mx-1">
          <div
            className="flex items-center p-2 w-5/12 md:w-32 md:h-9 my-3 mx-2 bg-blue-700 rounded-md mb-2 hover:bg-blue-600 cursor-pointer"
            onClick={() => handleRegresar(tarea.id)}
          >
            <button
              type="button"
              className=" font-mono text-sm md:text-base items-center text-gray-200"
            >
              Regresar
            </button>

            <img
              src={Regresar}
              alt="regresar"
              className="w-4 h-4 md:w-4 md:h-4 ml-1 md:ml-4 mr-4 blacktowhite"
            />
          </div>

          <div
            className="flex items-center p-2 w-5/12 md:w-32 md:h-9 my-3 mx-2 bg-red-700 rounded-md  mb-2 hover:bg-red-600 cursor-pointer"
            onClick={handleDelete}
          >
            <button
              type="button"
              className=" font-mono text-sm md:text-base text-gray-200 no-underline"
            >
              Eliminar
            </button>

            <img
              src={Delete}
              alt="delete"
              className="w-4 h-4 md:w-4 md:h-4 md:ml-4 mr-4 blacktowhite"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
