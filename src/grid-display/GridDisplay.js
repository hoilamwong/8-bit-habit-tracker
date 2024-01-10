import React, { useEffect, useState } from 'react'

export default function GridDisplay({ grid, gridcolumn, handleSquareClick, isEditing }) {


  return (
    <div className={'grid p-4 border border-black gap-1'} style={{ gridTemplateColumns: `repeat(${gridcolumn}, minmax(0, 1fr))` }}>
      {/* Individual Square */}
      {grid && grid.map((square) => (
        <div
          key={`square-${square.id}`}
          onClick={(e) => handleSquareClick(e, square.id)}
          className={` w-full aspect-square justify-center items-center flex
              ${square.selectable ? 
                  square.checked ? 'border  cursor-pointer bg-gray-700' : 'bg-gray-400'
                :
                  'bg-gray-100 cursor-not-allowed'
              }
              ${isEditing && 'border border-black/10 cursor-pointer'}
            `}
        >
          {square.selectable &&
            <span className='text-black-20'>
              {square.id}
            </span>
          }
        </div>
      ))}
    </div>
  )
}
