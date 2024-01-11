import React, { useEffect, useState } from 'react'

export default function GridDisplay({ grid, gridcolumn, handleSquareClick, isEditing, toggleCount }) {


  return (
    <div className={'grid p-4 border border-black '} style={{ gridTemplateColumns: `repeat(${gridcolumn}, minmax(0, 1fr))` }}>
      {/* Individual Square */}
      {grid && grid.map((square) => (
        <div
          key={`square-${square.id}`}
          onClick={(e) => handleSquareClick(e, square.id)}
          className={` w-full aspect-square justify-center items-center flex text-sm
            ${square.checked && 'bg-gray-900 text-white' }
            ${square.selectable ? 
                `cursor-pointer bg-gray-400` 
              :
                'cursor-not-allowed bg-gray-100'
            }
            ${(square.selectable || square.checked) && 'border border-gray-500/50'}
            ${isEditing && 'border border-black/80 cursor-pointer'}
          `}
        >
          {(square.selectable && toggleCount) &&
            <p> {square.count} </p>
          }
        </div>
      ))}
    </div>
  )
}
