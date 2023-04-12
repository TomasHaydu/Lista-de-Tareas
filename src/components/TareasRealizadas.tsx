import React from "react";
import Save from "../img/saveds.png";
import Modal from "./Modal";
import type { Tarea } from "../types";

interface Props {
  unaTarea: Tarea;
  setUnaTarea: React.Dispatch<React.SetStateAction<Tarea>>;
  eliminarTarea: (id: string) => void;
  tareasRealizadas: Tarea[];
  realizadasToTareas: (id: string) => void;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const TareasRealizadas: React.FC<Props> = ({
  tareasRealizadas,
  unaTarea,
  setUnaTarea,
  eliminarTarea,
  realizadasToTareas,
  active,
  setActive,
}) => {
  return (
    <div className="col-span-1 z-50">
      <div className="flex flex-col items-center">
        <button
          className=" w-12 md:w-12 bg-sky-600 hover:bg-sky-500 rounded-full p-1 mr-4"
          onClick={() => setActive(true)}
          data-cy="button-tareas-realizadas"
        >
          <img
            src={Save}
            alt="tareas realizadas"
            className="blacktowhite"
            data-cy="img-tareas-realizdas"
          />
        </button>
        <label
          className="mx-4 text-white font-mono text-xs md:text-xs"
          data-cy="titulo-tareas-realizadas"
        >
          Tareas Realizadas
        </label>
      </div>

      {active === true ? (
        <div
          data-cy="modal-tareas-realizadas"
          className="text-white fixed top-0 left-0 h-full w-full md:h-64 md:w-11/12 md:mx-14 md:mt-20 bg-slate-400 rounded-xl border-4 border-sky-800"
        >
          <div className="">
            <div className="flex justify-between">
              <p className="mx-4 my-3 font-bold text-gray-200 text-2xl md:mb-3 md:mt-4 text-center ">
                Tareas Relizadas :
              </p>
              <button
                className="mx-6 my-3 bg-red-300 hover:bg-red-200 w-7 h-7 rounded-full"
                onClick={() => setActive(false)}
                data-cy="close-tareas-realizadas"
              >
                X
              </button>
            </div>

            {tareasRealizadas.length === 0 ? (
              <p
                data-cy="any-tareas-realizadas"
                className="flex justify-center"
              >
                No existen tareas realizadas...
              </p>
            ) : (
              <div className=" overflow-y-auto md:max-h-44 ">
                {tareasRealizadas.map((tarea) => (
                  <Modal
                    tarea={tarea}
                    key={tarea.id}
                    setUnaTarea={setUnaTarea}
                    eliminarTarea={eliminarTarea}
                    realizadasToTareas={realizadasToTareas}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TareasRealizadas;
