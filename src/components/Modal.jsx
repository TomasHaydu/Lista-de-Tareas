import Regresar from '../img/regresar.png';
import Delete from '../img/delete.png';

const Modal = ({tarea, setUnaTarea, eliminarTarea, realizadasToTareas}) => {

    const handleDelete = () => {
        const response = confirm('Desea ELIMINAR esta tarea?')

        if(response){
            eliminarTarea(tarea.id)
        }

    setUnaTarea({})
    }

    const handleRegresar = (id) => {
        const response = confirm('Desea REGRESAR esta tarea REALIZADA a la lista de tareas?')

        if(response) {
            realizadasToTareas(id)
        }
    }

  return (
    <div
    className='bg-gray-400 mx-10 h-full my-2 md:h-12 flex-row md:items-center md:justify-between ' 
    >
        <p
        className= 'ml-6 underline'
        >
            Titulo:{" "}
            </p>
            <span
            className='normal-case text-base no-underline w-56 flex md:max-w-xs max-h-6 overflow-hidden ml-8 md:ml-2'
            >
                {tarea.titulo}
            </span>


        <p
        className='ml-6 underline'
        >
            Descripcion:{" "}
            </p>
            <span
             className='normal-case ml-8 text-base w-56 flex md:max-w-xs max-h-6 overflow-hidden'
            >
                {tarea.descripcion}
            </span>


        <p
        className= 'ml-6 underline'
        >
            Fecha limite: {" "}
            </p>
            <span
            className=' ml-8 normal-case text-base'
            >
                {tarea.fecha}
            </span>

        
        <div className='flex justify-around mx-2'>
            <div
            className='flex p-2 w-5/12 md:w-32 md:h-9 my-3 mx-6 bg-blue-700 rounded-md mb-2 hover:bg-blue-600 cursor-pointer'
            onClick={() => handleRegresar(tarea.id)}
            >
                <button 
                type='button'
                className=' font-mono text-sm md:text-base items-center text-gray-200'
                >Regresar
                </button>

                <img 
                src={Regresar} alt="regresar"
                className='w-4 h-4 md:w-4 md:h-4 ml-1 md:ml-4 mr-4 blacktowhite'
                />

            </div>

            <div
            className='flex p-2 w-5/12 md:w-32 md:h-9 my-3 mx-6 bg-red-700 rounded-md  mb-2 hover:bg-red-600 cursor-pointer'
            onClick={handleDelete}
            >
            <button 
            type='button'
            className=' font-mono text-sm md:text-base text-gray-200 no-underline'
            >Eliminar
            </button>

            <img 
            src={Delete} alt="delete"
            className='w-4 h-4 md:w-4 md:h-4 md:ml-4 mr-4 blacktowhite'
             />

            </div>
        </div>
    </div>
  )
}

export default Modal