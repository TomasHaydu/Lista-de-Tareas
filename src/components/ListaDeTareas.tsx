import { useState } from "react";
import generarId from "../utilities/IdGenerador";
import { Tarea } from "../types";
import TareasRealizadas from "./TareasRealizadas";
import TareaComponent from "./TareaComponent";

interface Props {
  tareas: Tarea[];
  setTareas: React.Dispatch<React.SetStateAction<Tarea[]>>;
  unaTarea: Tarea;
  setUnaTarea: React.Dispatch<React.SetStateAction<Tarea>>;
  eliminarTarea: (id: string) => void;
  tareasToRealizadas: (id: string) => void;
  tareasRealizadas: Tarea[];
  realizadasToTareas: (id: string) => void;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListaDeTareas: React.FC<Props> = ({
  tareas,
  setTareas,
  unaTarea,
  setUnaTarea,
  eliminarTarea,
  tareasToRealizadas,
  tareasRealizadas,
  realizadasToTareas,
  active,
  setActive,
}) => {
  const [buscador, setBuscador] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setBuscador(e.target.value);
  };

  const filtrarElementos = (
    terminoBusqueda: string,
    tareasPorMostrar: Tarea[]
  ): Tarea[] => {
    const resultadosBusqueda: Tarea[] = tareasPorMostrar.filter((elemento) => {
      const titulo: string = elemento.titulo.toString().toLowerCase();
      const descripcion: string = elemento.descripcion.toString().toLowerCase();
      if (titulo.includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      } else if (descripcion.includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      } else return null;
    });
    return resultadosBusqueda;
  };

  const handleSelect = (value: string): void => {
    const tareasOrden: Tarea[] = [...tareas];

    if (tareasOrden.length > 0) {
      //Alfabetico
      if (value === "alfabetico" || value === "") {
        setTareas(
          tareasOrden.sort((a: Tarea, b: Tarea): number => {
            const tituloA: string = a.titulo.toLowerCase();
            const tituloB: string = b.titulo.toLowerCase();
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
          tareasOrden
            .sort((a: Tarea, b: Tarea): number => {
              const importanciaA: number = a.importancia;
              const importanciaB: number = b.importancia;
              return importanciaA - importanciaB;
            })
            .reverse()
        );
      }
      //Fecha
      if (value === "fecha") {
        setTareas(
          tareasOrden.sort((a: Tarea, b: Tarea): number => {
            return new Date(a.fecha).valueOf() - new Date(b.fecha).valueOf();
          })
        );
      }
    }
  };

  return (
    <div className="bg-slate-500 pt-4 mt-8 md:mt-0 md:ml-4 md:w-1/2 rounded-lg max-h-max  shadow-black shadow-2xl">
      <div className="grid grid-cols-3">
        <p
          className="col-span-1 col-start-2 font-bold text-gray-200 text-2xl mx-auto mb-4 md:my-6 text-center"
          data-cy="titulo-lista"
        >
          Sus tareas :
        </p>
        <TareasRealizadas
          unaTarea={unaTarea}
          setUnaTarea={setUnaTarea}
          eliminarTarea={eliminarTarea}
          tareasRealizadas={tareasRealizadas}
          realizadasToTareas={realizadasToTareas}
          active={active}
          setActive={setActive}
        />
      </div>

      <div className="grid grid-cols-3 my-3">
        <div className="col-span-2">
          <label className="ml-6 md:ml-8 text-slate-50">Buscador :</label>
          {tareas.length === 0 ? (
            <input
              type="text"
              disabled
              className="rounded-lg p-1 w-32 md:w-56 md:ml-2 ml-6"
              data-cy="buscador-tareas-realizadas"
            />
          ) : (
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              className="rounded-lg p-1 ml-6 md:ml-2 hover:bg-slate-100 w-32 md:w-56"
              list="tareas"
              data-cy="buscador-tareas-realizadas"
            />
          )}
          <datalist id="tareas">
            {tareas.length > 0 ??
              tareas.map((tarea) => (
                <option key={generarId()} value={tarea.titulo}></option>
              ))}
          </datalist>
        </div>
        <div className="mr-4 col-span-1 md:mt-0 mt-6">
          <select
            className="w-20 md:w-32 p-2 rounded-lg text-xs"
            onChange={(e) => handleSelect(e.target.value)}
            data-cy="select-tareas-realizadas"
          >
            <option disabled value="">
              -Ordernar por-
            </option>
            <option value="alfabetico">A-Z</option>
            <option value="fecha">Fecha</option>
            <option value="importancia">Importancia</option>
          </select>
        </div>
      </div>

      {tareas &&
      tareas[0] &&
      filtrarElementos(buscador, tareas).length !== 0 ? (
        <div
          className={
            active === true
              ? "md:h-screen overflow-y-hidden"
              : "overflow-y-scroll md:h-screen scroll-smooth"
          }
        >
          {filtrarElementos(buscador, tareas).map((tarea) => (
            <TareaComponent
              tarea={tarea}
              key={tarea.id}
              setUnaTarea={setUnaTarea}
              eliminarTarea={eliminarTarea}
              tareasToRealizadas={tareasToRealizadas}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center md:mt-28">
          <p
            className="font-mono text-gray-200 text-base mx-8 my-4"
            data-cy="ninguna-tarea"
          >
            {buscador.length === 0
              ? "Aun no se han agregado tareas..."
              : "No hay resultados para la busqueda"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ListaDeTareas;
