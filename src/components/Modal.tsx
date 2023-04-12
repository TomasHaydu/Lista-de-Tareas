import Regresar from "../img/regresar.png";
import Delete from "../img/delete.png";
import dayMonthYear from "../utilities/ddmmyyyy";
import dayNow from "../utilities/DayNow";
import { InitialValue, Tarea } from "../types";

interface Props {
  tarea: Tarea;
  setUnaTarea: React.Dispatch<React.SetStateAction<Tarea>>;
  eliminarTarea: (id: string) => void;
  realizadasToTareas: (id: string) => void;
}

const Modal: React.FC<Props> = ({
  tarea,
  setUnaTarea,
  eliminarTarea,
  realizadasToTareas,
}) => {
  const handleDelete = (): void => {
    const response = confirm("Desea ELIMINAR esta tarea?");

    if (response) {
      eliminarTarea(tarea.id ? tarea.id : "");
    }

    setUnaTarea(InitialValue);
  };

  const handleRegresar = (id: string): void => {
    const response = confirm(
      "Desea REGRESAR esta tarea REALIZADA a la lista de tareas?"
    );

    if (response) {
      const animationTarea: HTMLElement = document.getElementById(
        `tarea${id}`
      )!;
      animationTarea.classList.add("tareas-regresar");

      setTimeout(() => {
        realizadasToTareas(id);
      }, 150);
    }
  };

  return (
    <div
      className="bg-gray-400 mx-10 h-full my-2 md:max-h-96"
      id={`tarea${tarea.id}`}
    >
      <div
        data-cy="tarea-Trealizadas"
        className="ml-4 flex flex-col items-start md:flex md:flex-row md:items-center md:justify-between"
      >
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-start md:items-center md:w-4/6">
          <p className="underline">Titulo: </p>
          <span
            data-cy="titulo-tarea-Trealizadas"
            className="normal-case justify-center md:justify-start text-base no-underline w-56 flex md:flex-grow md:max-w-xs md:w-96 max-h-12 ml-8 md:ml-2 overflow-y-auto"
          >
            {tarea.titulo}
          </span>
          <p className="md:ml-2 underline md:w-40">Fecha limite: </p>
          <span
            data-cy="fecha-tarea-Trealizadas"
            className=" normal-case text-base md:w-60 md:flex md:justify-start "
          >
            {dayMonthYear(tarea.fecha) === dayNow()
              ? "HOY"
              : dayMonthYear(tarea.fecha)}
          </span>
          <p className="md:ml-2 mb-2 underline md:w-40">Importancia: </p>
          <span
            data-cy="importancia-tarea-Trealizadas"
            className={
              tarea.importancia == 1
                ? "bg-sky-300 font-bold md:justify-start mr-16  p-1 mx-8 text-base md:ml-2 md:p-1.5 rounded-xl text-black uppercase"
                : tarea.importancia == 2
                ? "bg-amber-300 font-bold md:justify-start mr-16 text-base ml-2 p-1.5 rounded-xl text-black uppercase"
                : "bg-red-400 font-bold md:justify-start mr-16 text-base ml-2 p-1.5 rounded-xl text-black uppercase"
            }
          >
            {tarea.importancia == 1
              ? "bajo"
              : tarea.importancia == 2
              ? "medio"
              : "alto"}
          </span>
        </div>
        <div className="flex justify-around mx-1">
          <div
            className="flex items-center p-2 w-5/12 md:w-32 md:h-9 my-3 mx-2 bg-blue-700 rounded-md mb-2 hover:bg-blue-600 cursor-pointer"
            onClick={() => handleRegresar(tarea.id!)}
            data-cy="regresar-tarea-Trealizadas"
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
            data-cy="eliminar-tarea-Trealizadas"
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
