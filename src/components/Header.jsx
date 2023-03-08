
const Header = () => {
  return (
    <>  

        <h1      
        className='font-black text-center bg-slate-600 p-6  text-gray-200 text-3xl m-auto '
        data-cy="titulo"
        >Lista de Tareas</h1>
      <h2
        className='font-mono text-center text-gray-300 text-xl mt-2 '
        data-cy="descripcion"
        >Organiza tu lista de tareas facilmente...</h2>
    </>
  )
}

export default Header