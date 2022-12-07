import { useState } from "react";
import Tarea from "./Tarea";
import TareasRealizadas from "./TareasRealizadas";

const ListaDeTareas = ({
  tareas,
  setTareas,
  unaTarea,
  setUnaTarea,
  eliminarTarea,
  tareasToRealizadas,
  tareasRealizadas,
  realizadasToTareas,
}) => {
  const [buscador, setBuscador] = useState("");

  const handleChange = (e) => {
    setBuscador(e.target.value);
  };

  const filtrarElementos = (terminoBusqueda, tareasPorMostrar) => {
    const resultadosBusqueda = tareasPorMostrar.filter((elemento) => {
      const titulo = elemento.titulo.toString().toLowerCase();
      const descripcion = elemento.descripcion.toString().toLowerCase();
      if (titulo.includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      } else if (descripcion.includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      } else return null;
    });
    return resultadosBusqueda;
  };

  return (
    <div className="bg-slate-500 pt-4 mt-8 md:mt-0 md:ml-4 md:w-1/2 rounded-lg max-h-max  shadow-black shadow-2xl">
      <div
      className="md:flex md:justify-between"
      >
        <p className="font-bold text-gray-200 text-2xl mx-auto mb-4 md:ml-52 md:mb-6 md:mt-6 text-center">
          Sus tareas :
        </p>
        <TareasRealizadas
          tareas={tareas}
          unaTarea={unaTarea}
          setUnaTarea={setUnaTarea}
          eliminarTarea={eliminarTarea}
          tareasToRealizadas={tareasToRealizadas}
          tareasRealizadas={tareasRealizadas}
          realizadasToTareas={realizadasToTareas}
        />
      </div>

      <div className="flex justify-between">
        <div className="ml-14 mt-3 ">
          <label className="mr-4 text-slate-50">Buscador :</label>
          {tareas.length === 0 ? (
            <input
              type="text"
              disabled
              className="rounded-lg p-1 w-40 md:w-64"
            />
          ) : (
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              className="rounded-lg p-1 hover:bg-slate-100 w-40 md:w-64"
            />
          )}
        </div>
      </div>

      {tareas &&
      tareas.length &&
      filtrarElementos(buscador, tareas).length !== 0 ? (
        <div className="overflow-y-auto md:h-screen">
          {filtrarElementos(buscador, tareas).map((tarea) => (
            <Tarea
              tarea={tarea}
              key={tarea.id}
              unaTarea={unaTarea}
              setUnaTarea={setUnaTarea}
              eliminarTarea={eliminarTarea}
              tareasToRealizadas={tareasToRealizadas}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center md:mt-28">
          <p className="font-mono text-gray-200 text-base mx-8 my-4 ">
            {buscador.length === 0 ? "Aun no se han agregado tareas..." : "La busqueda ha fallado" }
          </p>
        </div>
      )}
    </div>
  );
};

export default ListaDeTareas;
