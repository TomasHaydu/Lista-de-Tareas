import {useState} from 'react';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';

const Tarea = ({tarea, setUnaTarea, eliminarTarea}) => {

    const [isChecked, setIsChecked] = useState(false)

    const handleDelete = () => {
        const response = confirm('Desea ELIMINAR esta tarea?')

        if(response){
            eliminarTarea(tarea.id)
        }
    }

  return (
    <div
    className={isChecked===true ? ' bg-gray-500 rounded-md ml-8 mr-8 shadow-md p-1 mt-4 mb-4' 
    : 'bg-gray-400 rounded-md ml-8 mr-8 shadow-md p-1 mt-4 mb-4' }
    >
        <p
        className={isChecked===true ? 'line-through mt-4 mb-4 text-gray-200 w-4/5 m-auto rounded-md font-mono uppercase text-lg' 
        : 'mt-4 mb-4 text-gray-200 w-4/5 m-auto rounded-md font-mono uppercase text-lg'}
        >
            Titulo:{" "}
            <span
            className='normal-case text-base no-underline'
            >
                {tarea.titulo}
            </span>
        </p>

        <p
        className={isChecked===true ? 'line-through mt-4 mb-4 text-gray-200 w-4/5 m-auto rounded-md font-mono uppercase text-lg' 
        : 'mt-4 mb-4 text-gray-200 w-4/5 m-auto rounded-md font-mono uppercase text-lg'}
        >
            Descripcion:{" "}
            <span
             className='normal-case text-base'
            >
                {tarea.descripcion}
            </span>
        </p>

        <p
        className={isChecked===true ? 'line-through mt-4 mb-4 text-gray-200 w-4/5 m-auto rounded-md font-mono uppercase text-lg' 
        : 'mt-4 mb-4 text-gray-200 w-4/5 m-auto rounded-md font-mono uppercase text-lg'}
        >
            Fecha limite: {" "}
            <span
            className=' normal-case text-base'
            >
                {tarea.fecha}
            </span>
        </p>
        
        <div className='flex justify-around'>
            <div
            className='flex p-2 w-28 bg-blue-700 rounded-md mb-2 hover:bg-blue-600 cursor-pointer'
            onClick={() => setUnaTarea(tarea)}
            >
                <button 
                type='button'
                className=' font-mono text-gray-200'
                >Editar
                </button>

                <img 
                src={Edit} alt="edit"
                className='w-6 h-6 ml-4 mr-4 blacktowhite'
                />

            </div>

            <div
            className='flex p-2 w-32 bg-red-700 rounded-md  mb-2 hover:bg-red-600 cursor-pointer'
            onClick={handleDelete}
            >
            <button 
            type='button'
            className=' font-mono text-gray-200 no-underline'
            >Eliminar
            </button>

            <img 
            src={Delete} alt="delete"
            className='w-6 h-6 ml-4 mr-4 blacktowhite'
             />

            </div>

            <div className="flex items-center mr-4">
                <input id="teal-checkbox" 
                type="checkbox" value=""
                checked={isChecked}
                onChange={isChecked===false ? ()=> setIsChecked(true):()=> setIsChecked(false)}
                className=" mb-2 w-6 h-6  text-teal-600 bg-gray-100 rounded-md
                 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600
                  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            </div>
        </div>
    </div>
  )
}

export default Tarea