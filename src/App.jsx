import { useState, useEffect } from 'react'
import Header from './components/Header'
import Formulario from './components/Formulario'
import ListaDeTareas from './components/ListaDeTareas'

function App() {
  const [tareas, setTareas] = useState (JSON.parse(localStorage.getItem('tareas')) ?? []);
  const [unaTarea, setUnaTarea] = useState ({})


  useEffect( () => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
  }, [tareas])



  const eliminarTarea = (id) => {
    const listaTareasActualizadas = tareas.filter( (tarea) => tarea.id !== id )

    setTareas(listaTareasActualizadas)
  }

  return (
    <>
      <div 
          className='md:felx'
      >
        <Header />
      </div>
      <div
      className='flex-col p-10 '
      >
        <Formulario 
          tareas = {tareas}
          setTareas = {setTareas}
          unaTarea = {unaTarea}
          setUnaTarea = {setUnaTarea}
        />
        <ListaDeTareas
          tareas = {tareas}
          setTareas = {setTareas}
          unaTarea = {unaTarea}
          setUnaTarea = {setUnaTarea}
          eliminarTarea = {eliminarTarea}
        />
      </div>
    </>
  )
}

export default App
