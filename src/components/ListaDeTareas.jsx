import { useEffect } from "react";
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

  const handleSelect = (value) => {
    setSelect(value);

    //Alfabetico
    if (value === "alfabetico") {
      setTareas(
        tareas.sort((a, b) => {
          const tituloA = a.titulo.toLowerCase();
          const tituloB = b.titulo.toLowerCase();
          if (tituloA < tituloB) {
            return -1;
          }

          if (tituloA > tituloB) {
            return 1;
          }
          return 0;
        })
      );
    }

    //Importancia
    if (value === "importancia") {
      setTareas(
        tareas
          .sort((a, b) => {
            const importanciaA = a.importancia;
            const importanciaB = b.importancia;
            return importanciaA - importanciaB;
          })
          .reverse()
      );
    }

    if (value === "fecha") {
      setTareas(tareas.sort((a, b) => {
        return (new Date (a.fecha)) - (new Date (b.fecha))
      }))
    }
  };

  return (
    <div className="bg-slate-500 pt-4 mt-8 md:mt-0 md:ml-4 md:w-1/2 rounded-lg max-h-max  shadow-black shadow-2xl">
      <div className="md:flex md:justify-between">
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
        <div className="ml-8 my-3 ">
          <label className="mr-4 text-slate-50">Buscador :</label>
          {tareas.length === 0 ? (
            <input
              type="text"
              disabled
              className="rounded-lg p-1 w-40 md:w-64 "
            />
          ) : (
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              className="rounded-lg p-1 hover:bg-slate-100 w-40 md:w-64"
            />
          )}
        </div>
        <div className="mr-12 my-3">
          <select
            className="w-32 p-2 rounded-lg text-xs"
            onChange={(e) => handleSelect(e.target.value)}
          >
            <option disabled value="">-Ordernar por-</option>
            <option value="alfabetico">A-Z</option>
            <option value="fecha">Fecha</option>
            <option value="importancia">Importancia</option>
          </select>
        </div>
      </div>

      {tareas &&
      tareas.length &&
      filtrarElementos(buscador, tareas).length !== 0 ? (
        <div className="overflow-y-scroll md:h-screen scroll-smooth">
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
            {buscador.length === 0
              ? "Aun no se han agregado tareas..."
              : "La busqueda ha fallado"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ListaDeTareas;
