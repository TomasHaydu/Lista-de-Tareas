import { useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import dayNow from "../utilities/DayNow";
import dayMonthYear from "../utilities/ddmmyyyy";
import { InitialValue, Tarea } from "../types";

interface Props {
  tarea: Tarea;
  setUnaTarea: React.Dispatch<React.SetStateAction<Tarea>>;
  eliminarTarea: (id: string) => void;
  tareasToRealizadas: (id: string) => void;
}

const TareaComponent: React.FC<Props> = ({
  tarea,
  setUnaTarea,
  eliminarTarea,
  tareasToRealizadas,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleDelete = (): void => {
    const response: boolean = confirm("Desea ELIMINAR esta tarea?");

    if (response) {
      if(tarea.id){
      eliminarTarea(tarea.id)}else{
        console.log("No se encontró ID de tarea al querer eliminarla")
      }
    }

    setUnaTarea(InitialValue);
  };

  const handleEdit = ():void => {
    const tareaId:HTMLElement = document.getElementById(`tarea${tarea.id}`)!
    tareaId.classList.add("tareas-edit")
                    
    setUnaTarea(tarea)
  }

  const handleChecked = (id: string): void => {
    if(tarea.id  || tarea.id !== ""){
    setTimeout(() => {
      tareasToRealizadas(id);
    }, 1500)}else{
      console.log("No se encontró ID de tarea al querer marcarla como realizada")
    }
  };

  return (
    <div
    id={`tarea${tarea.id}`}
      className={
        isChecked
          ? " bg-gray-500 rounded-md mx-6 shadow-md p-1 mt-4 mb-4  shadow-black tareas-in"
          : dayMonthYear(tarea.fecha) < dayNow()
          ? " bg-gray-600 rounded-md mx-6 shadow-md p-1 mt-4 mb-4  shadow-black tareas-in"
          : tarea.importancia == 1
          ? "bg-sky-200 rounded-md mx-6 shadow-md p-1 mt-4 mb-4  shadow-black tareas-in"
          : tarea.importancia == 2
          ? "bg-amber-200 rounded-md mx-6 shadow-md p-1 mt-4 mb-4 shadow-black tareas-in"
          : "bg-red-200 rounded-md mx-6 shadow-md p-1 mt-4 mb-4 shadow-black tareas-in"
      }
      data-cy="tarea"
    >
      {isChecked ? (
        <p data-cy="tarea-moviendose" className="m-auto text-center w-11/12 h-full text-white text-4xl">
          Moviendo a "Tareas Realizadas"...
        </p>
      ) : (
        <div>
          <p
            className={
              isChecked
                ? "flex-col md:flex-grow items-center justify-start my-2 md:my-4 mx-4 md:mx-12 overflow-hidden text-black w-4/5 rounded-md font-mono uppercase text-lg line-through"
                : "flex-col md:flex-grow items-center justify-start my-2 md:my-4 mx-4 md:mx-12 overflow-hidden text-black w-4/5 rounded-md font-mono uppercase text-lg"
            }
            data-cy="titulo-tarea"
          >
            Titulo:
            <span className="flex md:inline normal-case text-base mx-2 max-w-xs max-h-24 overflow-auto">
              {tarea.titulo}
            </span>
          </p>

          <p
            className={
              isChecked
                ? "flex-col md:flex-grow items-center justify-start my-2 md:my-4 mx-4 md:mx-12 overflow-hidden text-black w-4/5 rounded-md font-mono uppercase text-lg line-through"
                : "flex-col md:flex-grow items-center justify-start my-2 md:my-4 mx-4 md:mx-12 overflow-hidden text-black w-4/5 rounded-md font-mono uppercase text-lg"
            }
            data-cy="descripcion-tarea"
          >
            Descripcion:
            <span className="flex md:inline-flex normal-case text-base mx-2 max-w-xs md:max-w-md max-h-24 overflow-auto">
              {tarea.descripcion}
            </span>
          </p>

          <p
            className={
              isChecked
                ? "flex-col md:flex-grow items-center justify-start my-2 md:my-4 mx-4 md:mx-12 overflow-hidden text-black w-4/5 rounded-md font-mono uppercase text-lg line-through"
                : "flex-col md:flex-grow my-2 md:my-4 mx-4 md:mx-12 overflow-hidden text-black w-4/5 rounded-md font-mono uppercase text-lg"
            }
            data-cy="fecha-tarea"
          >
            Fecha limite:
            <span className="flex md:inline normal-case text-base mx-2 max-w-xs max-h-24">
              {dayMonthYear(tarea.fecha) === dayNow()
                ? "HOY"
                : dayMonthYear(tarea.fecha)}
            </span>
          </p>

          <p
            className={
              isChecked
                ? "flex md:flex-grow items-center justify-start my-2 md:my-4 mx-4 md:mx-12 overflow-hidden text-black w-4/5 rounded-md font-mono uppercase text-lg line-through"
                : "flex md:flex-grow items-center justify-start my-2 md:my-4 mx-4 md:mx-12 overflow-hidden text-black w-4/5 rounded-md font-mono uppercase text-lg"
            }
            data-cy="importancia-tarea"
          >
            Importancia:
            <span
              className={
                isChecked
                  ? "md:flex flex-row justify-start my-2 md:my-4 md:mx-12 overflow-hidden text-black w-4/5 rounded-md font-mono uppercase text-lg line-through"
                  : tarea.importancia == 1
                  ? "bg-sky-300 font-bold text-base p-1 rounded-full text-black uppercase"
                  : tarea.importancia == 2
                  ? "bg-amber-300 font-bold text-base p-1 rounded-full text-black uppercase"
                  : "bg-red-400 font-bold text-base p-1 rounded-full text-black uppercase"
              }
            >
              {tarea.importancia == 1
                ? "bajo"
                : tarea.importancia == 2
                ? "medio"
                : "alto"}
            </span>
          </p>

          <div className="flex justify-around">
            <div
              className={
                dayMonthYear(tarea.fecha) < dayNow()
                  ? "flex p-2 w-20 md:w-28 bg-blue-300 hover:bg-blue-400 rounded-md mb-2 cursor-pointer"
                  : "flex p-2 w-20 md:w-28 bg-blue-700 rounded-md mb-2 hover:bg-blue-600 cursor-pointer"
              }
              onClick={handleEdit}
              data-cy="editar-tarea"
            >
              <button
                type="button"
                className=" font-mono text-sm md:text-base text-gray-200"
              >
                Editar
              </button>

              <img
                src={Edit}
                alt="edit"
                className="w-4 h-4 md:w-6 md:h-6 ml-1 md:ml-4 mr-4 blacktowhite"
              />
            </div>

            <div
              className={
                dayMonthYear(tarea.fecha) < dayNow()
                  ? "flex p-2 w-5/12 md:w-32 bg-red-300 rounded-md  mb-2 hover:bg-red-400 cursor-pointer"
                  : "flex p-2 w-5/12 md:w-32 bg-red-700 rounded-md  mb-2 hover:bg-red-600 cursor-pointer"
              }
              onClick={handleDelete}
              data-cy="eliminar-tarea"
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
                className="w-4 h-4 md:w-6 md:h-6 md:ml-4 mr-4 blacktowhite"
              />
            </div>

            <div className="flex items-center  md:mr-4">
              <input
                id="teal-checkbox"
                type="checkbox"
                value=""
                checked={isChecked}
                onChange={
                  isChecked === false
                    ? () => setIsChecked(true)
                    : () => setIsChecked(false)
                }
                onClick={() => handleChecked(tarea.id ? tarea.id : "" )}
                data-cy="check-tarea"
                className=" mb-2 h-5 w-5 md:w-6 md:h-6  text-teal-600 bg-gray-100 rounded-md border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TareaComponent;
