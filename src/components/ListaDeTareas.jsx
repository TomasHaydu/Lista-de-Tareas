import BuscadorTareas from "./BuscadorTareas";
import Tarea from "./Tarea";
import TareasRealizadas from "./TareasRealizadas";

const ListaDeTareas = ({ tareas, unaTarea, setUnaTarea, eliminarTarea, tareasToRealizadas, tareasRealizadas, realizadasToTareas }) => {
  return (
    <div className="bg-slate-500 pt-4 mt-8 md:mt-0 md:ml-4 md:w-1/2 rounded-lg shadow-md max-h-max">
      <p className="font-bold text-gray-200 text-2xl md:mb-6 md:mt-6 text-center">
        Sus tareas :
      </p>

      <div
      className="flex justify-between"
      >
        <BuscadorTareas />
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

      {tareas && tareas.length ? (
        <div className="overflow-y-auto md:h-screen">
          {tareas.map((tarea) => (
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
            Aun no se han agregado tareas...
          </p>
        </div>
      )}
    </div>
  );
};

export default ListaDeTareas;
