import React from 'react'

const BuscadorTareas = () => {
  return (
    <div
    className='ml-14 mt-3 '
    >
        <label
        className='mr-4 text-slate-50'
        >Buscador :</label>
        <input
        type="text"
        className='rounded-lg p-1 hover:bg-slate-100 w-40 md:w-64'
        />
    </div>
  )
}

export default BuscadorTareas