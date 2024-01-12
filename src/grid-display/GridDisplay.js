import React, { useEffect, useState } from 'react'

export default function GridDisplay({ grid, gridcolumn, handleSquareClick, isEditing, toggleCount }) {

  // let getGridWidth = document.getElementById('grid').offsetWidth

  return (
    <div
      className={'grid p-4 bg-white/30 rounded-2xl shadow-2xl w-full gap-1'} 
      style={{ 
        gridTemplateColumns: `repeat(${gridcolumn}, minmax(0, 1fr))`
      }}
    >
      {/* Individual Square */}
      {grid && grid.map((square) => (
        <div
          key={`square-${square.id}`}
          onClick={(e) => handleSquareClick(e, square.id)}
          className={`h-full w-full aspect-square justify-center items-center flex text-sm rounded-lg shadow-sm shadow-indigo-100 hover:scale-110 duration-100 transition-transform
            ${square.checked && 'bg-indigo-400 text-white' }
            ${square.selectable && !square.checked && `cursor-pointer bg-indigo-200`}
            ${!square.selectable && 'cursor-not-allowed'}
            ${(square.selectable || square.checked) && 'border border-indigo-400/50'}
            ${isEditing && 'border border-indigo-600/50 cursor-pointer'}
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
