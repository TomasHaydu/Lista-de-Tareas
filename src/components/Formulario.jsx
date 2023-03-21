import { useState } from "react";
import Add from "../img/add.png";
import Edit from "../img/edit.png";
import { useEffect } from "react";
import generarId from "../utilities/IdGenerador";
import dayNow from "../utilities/DayNow";
import dayMonthYear from "../utilities/ddmmyyyy";

const Formulario = ({ tareas, setTareas, unaTarea, setUnaTarea }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState(dayMonthYear(dayNow()));
  const [importancia, setImportancia] = useState(2);

  const [error, setError] = useState(false);

  const existeUnaTareaSeleccionada = Object.keys(unaTarea).length > 0;

  useEffect(() => {
    if (existeUnaTareaSeleccionada) {
      setTitulo(unaTarea.titulo);
      setDescripcion(unaTarea.descripcion);
      setFecha(unaTarea.fecha);
      setImportancia(unaTarea.importancia);
    }
  }, [unaTarea]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Error campos vacios
    if ([titulo, descripcion].includes("".trim())) {
      setError(true);
      return;
    }
    setError(false);

    const objetoTarea = {
      titulo,
      descripcion,
      fecha,
      importancia,
    };

    //Editar Tarea
    if (unaTarea.id) {
      objetoTarea.id = unaTarea.id;
      const listaTareasActualizada = tareas.map((tareaElegida) =>
        tareaElegida.id === unaTarea.id ? objetoTarea : tareaElegida
      );

      setTareas(listaTareasActualizada);
      setUnaTarea({});
    } else {
      //Nueva Tarea
      objetoTarea.id = generarId();
      setTareas([...tareas, objetoTarea]);
    }

    //Reiniciar Formulario
    setTitulo("");
    setDescripcion("");
    setFecha(dayMonthYear(dayNow()));
    setImportancia(2);
  };

  return (
    <div className="bg-slate-500 p-1 w-full md:w-1/2 md:mr-4 rounded-lg text-center shadow-black shadow-2xl ">
      <p
        className="font-bold text-gray-200 text-2xl mb-6 mt-6 "
        data-cy="titulo-formulario"
      >
        Agrega tus tareas :
      </p>

      <form data-cy="form" onSubmit={handleSubmit}>
        <div>
          <p
            className=" mt-4 mb-4 text-gray-200 bg-gray-400 w-4/5
             m-auto rounded-md font-mono uppercase text-lg"
          >
            Titulo
          </p>
          <input
            type="text"
            onChange={(e) => setTitulo(e.target.value)}
            value={titulo}
            placeholder="Titulo"
            data-cy="titulo-in-form"
            className="p-3 w-4/5 rounded-md font-mono"
          />
        </div>

        <div>
          <p
            className="mt-4 mb-4 text-gray-200 bg-gray-400 w-4/5
            m-auto rounded-md font-mono uppercase text-lg"
          >
            Descripcion
          </p>
          <input
            type="text"
            onChange={(e) => setDescripcion(e.target.value)}
            value={descripcion}
            placeholder="Descripcion"
            data-cy="descripcion-in-form"
            className="p-3 w-4/5 h-32 rounded-md"
          />
        </div>

        <div>
          <p
            className="mt-4 mb-4 text-gray-200 bg-gray-400 w-4/5
            m-auto rounded-md font-mono uppercase text-lg "
          >
            Fecha limite
          </p>
          <input
            type="date"
            onChange={(e) => setFecha(e.target.value)}
            value={fecha}
            placeholder={fecha}
            data-cy="fecha-in-form"
            className="p-3 w-4/5 rounded-md "
          />
        </div>

        <p
          className="mt-4 mb-4 text-gray-200 bg-gray-400 w-4/5
                        m-auto rounded-md font-mono uppercase text-lg "
        >
          Importancia
        </p>

        <div className="flex justify-center w-4/5 m-auto">
          <div
            className="bg-sky-300 w-1/3 rounded-l-full cursor-pointer"
            onClick={() => setImportancia("1")}
            data-cy="importancia-in-form"
          >
            <input
              type="radio"
              value="1"
              checked={importancia == "1" ? true : false}
              onChange={(e) => setImportancia(e.target.value)}
              data-cy="importancia-in-form-1"
            />
            <label className="cursor-pointer">Bajo</label>
          </div>

          <div
            className="bg-amber-300 w-1/3 cursor-pointer"
            onClick={() => setImportancia("2")}
          >
            <input
              type="radio"
              value="2"
              checked={importancia == "2" ? true : false}
              onChange={(e) => setImportancia(e.target.value)}
              data-cy="importancia-in-form-2"
            />
            <label className="cursor-pointer">Medio</label>
          </div>

          <div
            className="bg-red-400 w-1/3 rounded-r-full cursor-pointer"
            onClick={() => setImportancia("3")}
          >
            <input
              type="radio"
              value="3"
              checked={importancia == "3" ? true : false}
              onChange={(e) => setImportancia(e.target.value)}
              data-cy="importancia-in-form-3"
            />
            <label className="cursor-pointer">Alto</label>
          </div>
        </div>

        {error ? (
          <div>
            <p
              data-cy="alerta"
              className="mt-4 text-gray-200 bg-red-600 w-4/5 m-auto rounded-md font-mono uppercase text-lg"
            >
              Todos los campos son obligatorios
            </p>
          </div>
        ) : (
          ""
        )}

        <div
          className=" m-auto p-4 text-xl w-4/5 rounded-md mt-4 mb-6
          bg-slate-800 text-gray-300 font-mono text-center
          hover:bg-slate-700 cursor-pointer flex justify-center "
          onClick={handleSubmit}
        >
          <input
            type="submit"
            value={existeUnaTareaSeleccionada ? "Editar" : "Añadir"}
            readOnly
            className="ml-4 cursor-pointer"
            data-cy="submite-form"
          />
          <img
            src={existeUnaTareaSeleccionada ? Edit : Add}
            alt="add"
            className="w-8 h-8 ml-4 blacktowhite"
          />
        </div>
      </form>
    </div>
  );
};

export default Formulario;
