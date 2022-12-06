import React from "react";
import { useState } from "react";
import Save from "../img/saveds.png";
import Modal from "./Modal";

const TareasRealizadas = ({ tareasRealizadas, unaTarea, setUnaTarea, eliminarTarea, realizadasToTareas }) => {
  const [active, setActive] = useState(false);

  return (
    <div>
      <button
        className=" w-10 md:w-12 bg-sky-600 hover:bg-sky-500 rounded-full p-1 mr-16"
        onClick={() => setActive(true)}
      >
        <img src={Save} alt="tareas realizadas" className="blacktowhite" />
      </button>

      {active === true ? (
        <div className="text-white overflow-y-scroll fixed top-0 left-0 h-full w-full md:h-64 md:w-11/12 md:mx-20 md:mt-20 bg-slate-400 rounded-xl border-4 border-sky-800">
          <div className="">
            <div
            className="flex justify-between"
            >
              <p
              className="mx-4 my-3 font-bold text-gray-200 text-2xl md:mb-3 md:mt-4 text-center "
              >Tareas Relizadas :</p>
              <button
              className="mx-6 my-3 bg-red-300 hover:bg-red-200 w-7 h-7 rounded-full"
              onClick={() => setActive(false)}>X</button>
            </div>

            {tareasRealizadas.map((tarea) => (
              <Modal
                tarea={tarea}
                key={tarea.id}
                unaTarea={unaTarea}
                setUnaTarea={setUnaTarea}
                eliminarTarea={eliminarTarea}
                realizadasToTareas={realizadasToTareas}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TareasRealizadas;