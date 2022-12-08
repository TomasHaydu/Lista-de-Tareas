import { useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";

const Tarea = ({ tarea, setUnaTarea, eliminarTarea, tareasToRealizadas }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleDelete = () => {
    const response = confirm("Desea ELIMINAR esta tarea?");

    if (response) {
      eliminarTarea(tarea.id);
    }

    setUnaTarea({});
  };

  const handleChecked = (id) => {
    setTimeout(() => {
      tareasToRealizadas(id);
    }, 500);
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

  console.log(dayNow());
  console.log(dayMonthYear(tarea.fecha));

  return (
    <div
      className={
        isChecked === true
          ? " bg-gray-500 rounded-md ml-8 mr-8 shadow-md p-1 mt-4 mb-4  shadow-black"
          : dayMonthYear(tarea.fecha) < dayNow() ? " bg-gray-600 rounded-md ml-8 mr-8 shadow-md p-1 mt-4 mb-4  shadow-black"
          :
          tarea.importancia == 1
          ? "bg-sky-200 rounded-md ml-8 mr-8 shadow-md p-1 mt-4 mb-4  shadow-black"
          : tarea.importancia == 2
          ? "bg-amber-200 rounded-md ml-8 mr-8 shadow-md p-1 mt-4 mb-4 shadow-black"
          : "bg-red-200 rounded-md ml-8 mr-8 shadow-md p-1 mt-4 mb-4 shadow-black"
      }
    >
      {dayMonthYear(tarea.fecha) == dayNow() ? (
        <span className="animate-ping inline-flex mx-2 mt-2 h-4 w-4 rounded-full bg-red-600 opacity-75"></span>
      ) : null}
      <p
        className={
          isChecked === true
            ? "flex line-through mt-4 mb-4 text-black w-4/5 m-auto rounded-md font-mono uppercase text-lg"
            : " md:flex mt-4 mb-4 text-black w-4/5 m-auto rounded-md font-mono uppercase text-lg"
        }
      >
        Titulo:{" "}
        <span className="normal-case text-base no-underline flex overflow-hidden">
          {tarea.titulo}
        </span>
      </p>

      <p
        className={
          isChecked === true
            ? "flex line-through mt-4 mb-4 flex-grow overflow-hidden text-black w-4/5 m-auto rounded-md font-mono uppercase text-lg"
            : " mt-4 mb-4 flex-grow overflow-hidden text-black w-4/5 m-auto rounded-md font-mono uppercase text-lg"
        }
      >
        Descripcion:{" "}
        <span className="normal-case text-base">{tarea.descripcion}</span>
      </p>

      <p
        className={
          isChecked === true
            ? "flex line-through mt-4 mb-4 text-black w-4/5 m-auto rounded-md font-mono uppercase text-lg"
            : "md:flex mt-4 mb-4 text-black w-4/5 m-auto rounded-md font-mono uppercase text-lg"
        }
      >
        Fecha limite:{" "}
        <span className=" normal-case text-base mt-1 ml-1">
          {dayMonthYear(tarea.fecha) === dayNow() ? "HOY" : dayMonthYear(tarea.fecha) }
        </span>
      </p>

      <p
        className={
          isChecked === true
            ? "line-through mt-4 mb-4 text-black w-4/5 m-auto rounded-md font-mono uppercase text-lg"
            : "mt-4 mb-4 text-black w-4/5 m-auto rounded-md font-mono uppercase text-lg"
        }
      >
        Importancia:{" "}
        <span
          className={
            isChecked === true
              ? " font-bold text-base p-2 rounded-full text-black uppercase"
              : tarea.importancia == 1
              ? "bg-sky-300 font-bold text-base p-2 rounded-full text-black uppercase"
              : tarea.importancia == 2
              ? "bg-amber-300 font-bold text-base p-2 rounded-full text-black uppercase"
              : "bg-red-400 font-bold text-base p-2 rounded-full text-black uppercase"
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
          className= {dayMonthYear(tarea.fecha) < dayNow() ? "flex p-2 w-20 md:w-28 bg-blue-300 hover:bg-blue-400 rounded-md mb-2 cursor-pointer" :
           "flex p-2 w-20 md:w-28 bg-blue-700 rounded-md mb-2 hover:bg-blue-600 cursor-pointer"}
          onClick={() => setUnaTarea(tarea)}
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
          className= {dayMonthYear(tarea.fecha) < dayNow() ? "flex p-2 w-5/12 md:w-32 bg-red-300 rounded-md  mb-2 hover:bg-red-400 cursor-pointer" :
          "flex p-2 w-5/12 md:w-32 bg-red-700 rounded-md  mb-2 hover:bg-red-600 cursor-pointer"}
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
            onClick={() => handleChecked(tarea.id)}
            className=" mb-2 h-5 w-5 md:w-6 md:h-6  text-teal-600 bg-gray-100 rounded-md
                 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600
                  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Tarea;
