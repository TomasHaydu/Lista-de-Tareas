import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListaDeTareas from "./components/ListaDeTareas";

function App() {
  const [tareas, setTareas] = useState(
    JSON.parse(localStorage.getItem("tareas")) ?? []
  );
  const [unaTarea, setUnaTarea] = useState({});

  const [tareasRealizadas, setTareasRealizadas] = useState(
    JSON.parse(localStorage.getItem("tareas-realizadas")) ?? []
  );

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  useEffect(() => {
    localStorage.setItem("tareas-realizadas", JSON.stringify(tareasRealizadas));
  }, [tareasRealizadas]);

  const eliminarTarea = (id) => {
    const listaTareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(listaTareasActualizadas);

    const listaTareasRealizadasActualizadas = tareasRealizadas.filter((tarea) => tarea.id !== id);
    setTareasRealizadas(listaTareasRealizadasActualizadas)
  };

  const tareasToRealizadas = (id) => {
    const realizada = tareas.find(tarea => tarea.id === id)
    const nuevaListaTareas = tareas.filter(tarea => tarea.id !== id)
    setTareas(nuevaListaTareas)
    setTareasRealizadas([...tareasRealizadas, realizada])
  }

  const realizadasToTareas = (id) => {
    const toTareas = tareasRealizadas.find(tarea => tarea.id === id)
    const tareasRealizadasActualizadas = tareasRealizadas.filter(tarea => tarea.id !== id)
    setTareasRealizadas(tareasRealizadasActualizadas)
    setTareas([...tareas, toTareas])
  }

  return (
    <div
    className="flex-col md:flex"
    >
      <div >
        <Header />
      </div>

      <div className="md:flex p-10 ">

          <Formulario
            tareas={tareas}
            setTareas={setTareas}
            unaTarea={unaTarea}
            setUnaTarea={setUnaTarea}
          />

          <ListaDeTareas
            tareas={tareas}
            setTareas={setTareas}
            unaTarea={unaTarea}
            setUnaTarea={setUnaTarea}
            eliminarTarea={eliminarTarea}
            tareasToRealizadas={tareasToRealizadas}
            tareasRealizadas={tareasRealizadas}
            realizadasToTareas={realizadasToTareas}
          />

      </div>
    </div>
  );
}

export default App;
