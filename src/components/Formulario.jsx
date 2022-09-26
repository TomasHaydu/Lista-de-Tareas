import {useState} from 'react'
import Error from './Error';
import Add from '../img/add.png'
import Edit from '../img/edit.png'
import { useEffect } from 'react';

const Formulario = ({
   tareas, 
   setTareas,
  unaTarea,
  setUnaTarea
  }) => {

  const [titulo, setTitulo] = useState ("");
  const [descripcion, setDescripcion] = useState ("");
  const [fecha, setFecha] = useState ("");

  const [error, setError] = useState (false)

  const generarId = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)

    return random + fecha
  }

  useEffect( ()=> {
    if(Object.keys(unaTarea).length > 0){
      setTitulo(unaTarea.titulo)
      setDescripcion(unaTarea.descripcion)
      setFecha(unaTarea.fecha)
    }
  },[unaTarea])

  const handleSubmit = (e) => {

    e.preventDefault()

    //Error campos vacios
    if( [titulo,descripcion,fecha].includes("") ){
      setError(true)
      return;
    }
    setError(false)

    const objetoTarea = {
      titulo,
      descripcion,
      fecha
    }

    //Editar Tarea
    if(unaTarea.id){
      objetoTarea.id = unaTarea.id
      const listaTareasActualizada = tareas.map((tareaElegida) =>
        tareaElegida.id === unaTarea.id ? objetoTarea : tareaElegida
      )

      setTareas(listaTareasActualizada)
      setUnaTarea({})

    }else{
      //Nueva Tarea
      objetoTarea.id = generarId()
      setTareas([...tareas, objetoTarea])
    }


    //Reiniciar Formulario
    setTitulo("");
    setDescripcion("");
    setFecha("");

  }


  return (
    <div
    className='bg-slate-500 p-1 w-full md:w-1/2 md:mr-4 rounded-lg text-center shadow-md'
    >

      <p
        className='font-bold text-gray-200 text-2xl mb-6 mt-6 '
      >Agrega tus tareas :</p>

        <form
        className=''
        onSubmit={handleSubmit}
        >
          <div>
            <p
            className=' mt-4 mb-4 text-gray-200 bg-gray-400 w-4/5
             m-auto rounded-md font-mono uppercase text-lg'
            >Titulo</p>
            <input 
            type="text" 
            onChange={ (e) => setTitulo(e.target.value)}
            value={titulo}
            placeholder="Titulo"
            className='p-3 w-4/5 rounded-md font-mono'
             />
          </div>

          <div>
            <p
            className='mt-4 mb-4 text-gray-200 bg-gray-400 w-4/5
            m-auto rounded-md font-mono uppercase text-lg'
            >Descripcion</p>
            <input
             type="text" 
             onChange={ (e) => setDescripcion(e.target.value)}
             value={descripcion}
             placeholder="Descripcion"
             className='p-3 w-4/5 h-32 rounded-md'
             />
          </div>

          <div>
            <p
            className='mt-4 mb-4 text-gray-200 bg-gray-400 w-4/5
            m-auto rounded-md font-mono uppercase text-lg '
            >Fecha limite</p>
            <input
             type="date" 
             onChange={ (e) => setFecha(e.target.value)}
             value={fecha}
             className='p-3 w-4/5 rounded-md '
             />
          </div>

          {error ? <Error /> : ""}

          <div
          className=' m-auto p-4 text-xl w-4/5 rounded-md mt-4 mb-6
          bg-slate-800 text-gray-300 font-mono text-center
          hover:bg-slate-700 cursor-pointer flex justify-center '
          onClick={handleSubmit}
          >
            <input 
            type="submit" 
            value={Object.keys(unaTarea).length > 0 ? "Editar" : "Añadir"}
            readOnly 
            className='ml-4 cursor-pointer'
            />
            <img
             src={Object.keys(unaTarea).length > 0 ? Edit : Add} alt="add"
             className='w-8 h-8 ml-4 blacktowhite'
             />
          </div>

        </form>
    </div>
  )
}

export default Formulario