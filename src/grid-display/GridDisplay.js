import React, { useEffect, useState } from 'react'

export default function GridDisplay({ grid, gridcolumn, handleSquareClick, isEditing, toggleCount }) {

  // let getGridWidth = document.getElementById('grid').offsetWidth

  return (
    <div
      className={'grid p-4 border border-black w-full'} 
      style={{ 
        gridTemplateColumns: `repeat(${gridcolumn}, minmax(0, 1fr))`
      }}
    >
      {/* Individual Square */}
      {grid && grid.map((square) => (
        <div
          key={`square-${square.id}`}
          onClick={(e) => handleSquareClick(e, square.id)}
          className={`w-full aspect-square justify-center items-center flex text-sm
            ${square.checked && 'bg-gray-900 text-white' }
            ${square.selectable && !square.checked && `cursor-pointer bg-gray-600`}
            ${!square.selectable && 'cursor-not-allowed'}
            ${(square.selectable || square.checked) && 'border border-gray-400/50'}
            ${isEditing && 'border border-slate-900/50 cursor-pointer'}
          `}
        >
          {(square.selectable && toggleCount) &&
            <div className='hidden sm:flex'>
              {square.count} 
            </div>
          }
        </div>
      ))}
    </div>
  )
}
