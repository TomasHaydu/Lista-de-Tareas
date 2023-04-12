import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListaDeTareas from "./components/ListaDeTareas";
import { InitialValue, Tarea } from "./types";

function App() {
  const [tareas, setTareas] = useState<Tarea[]>(
    JSON.parse(localStorage.getItem("tareas") || "[]") ?? []
  );

  const [unaTarea, setUnaTarea] = useState<Tarea>(InitialValue);

  const [tareasRealizadas, setTareasRealizadas] = useState<Tarea[]>(
    JSON.parse(localStorage.getItem("tareas-realizadas") || "[]") ?? []
  );

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  useEffect(() => {
    localStorage.setItem("tareas-realizadas", JSON.stringify(tareasRealizadas));
  }, [tareasRealizadas]);

  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    active
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [active]);

  const eliminarTarea = (id: string): void => {
    const listaTareasActualizadas: Tarea[] = tareas.filter(
      (tarea) => tarea.id !== id
    );

    const animationTarea:HTMLElement = document.getElementById(`tarea${id}`)!
      animationTarea.classList.add("tareas-out")

    setTimeout(() => {
      
    setTareas(listaTareasActualizadas);

    const listaTareasRealizadasActualizadas: Tarea[] = tareasRealizadas.filter(
      (tarea) => tarea.id !== id
    );
    setTareasRealizadas(listaTareasRealizadasActualizadas);
    }, 300);

  };

  const tareasToRealizadas = (id: string): void => {
    const realizada: Tarea | undefined = tareas.find(
      (tarea): boolean => tarea.id === id
    );
    const nuevaListaTareas: Tarea[] = tareas.filter(
      (tarea): boolean => tarea.id !== id
    );
    setTareas(nuevaListaTareas);
    if (realizada === undefined) {
      console.log(`Tarea marcada como realizada con id ${id} falló`);
    } else {
      setTareasRealizadas([...tareasRealizadas, realizada]);
    }
  };

  const realizadasToTareas = (id: string): void => {
    const toTareas: Tarea | undefined = tareasRealizadas.find(
      (tarea): boolean => tarea.id === id
    );
    const tareasRealizadasActualizadas: Tarea[] = tareasRealizadas.filter(
      (tarea): boolean => tarea.id !== id
    );
    setTareasRealizadas(tareasRealizadasActualizadas);
    if (toTareas === undefined) {
      console.log(`Tarea ya realizada con id ${id} falló`);
    } else {
      setTareas([...tareas, toTareas]);
    }
  };

  return (
    <div className="flex-col md:flex ">
      <div>
        <Header />
      </div>

      <div className="md:flex p-10">
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
          active={active}
          setActive={setActive}
        />
      </div>
    </div>
  );
}

export default App;
