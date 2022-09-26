import Tarea from "./Tarea"

const ListaDeTareas = ({tareas, unaTarea, setUnaTarea, eliminarTarea}) => {
  return (
    <div
    className='bg-slate-500 md:ml-4 md:w-1/2 rounded-lg shadow-md max-h-max'
    >
      <p
      className='font-bold text-gray-200 text-2xl mb-6 mt-6 text-center'
      >
        Sus tareas :
      </p>

      { tareas && tareas.length ? (


        <div className="overflow-y-auto md:h-screen">

        {tareas.map( (tarea) => (
          <Tarea
          tarea={tarea}
          key={tarea.id}
          unaTarea={unaTarea}
          setUnaTarea={setUnaTarea}
          eliminarTarea={eliminarTarea}
          />
        ))}

        </div>
      )
        :

        <div
        className="flex justify-center md:mt-28"
        >
          <p
          className="font-mono text-gray-200 text-base mx-8 my-4 "
          >
            Aun no se han agregado tareas...
          </p>
        </div>

      }

    </div>
  )
}

export default ListaDeTareas