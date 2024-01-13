import React, { useEffect, useState } from 'react'

export default function GridDisplay({ grid, gridcolumn, handleSquareClick, isEditing, toggleCount }) {

  // let getGridWidth = document.getElementById('grid').offsetWidth
  const [overSquareId, setOverSquareId] = useState(null)

  const handleMouseOver = (e, id) => {
    // prevent multiple toggling
    if(overSquareId == id) return
    setOverSquareId(id)

    if(e.buttons === 1 || e.buttons === 3){
      handleSquareClick(e, id)
    }
  }

  return (
    <div
      className={'grid p-4 bg-white/30 rounded-2xl shadow-sm shadow-indigo-200 w-full gap-1'} 
      style={{ 
        gridTemplateColumns: `repeat(${gridcolumn}, minmax(0, 1fr))`
      }}
    >
      {/* Individual Square */}
      {grid && grid.map((square) => (
        <div
          key={`square-${square.id}`}
          onMouseDown={(e) => handleSquareClick(e, square.id)}
          onMouseOver={(e) => handleMouseOver(e, square.id)}
          className={`h-full w-full aspect-square justify-center items-center flex text-sm rounded-lg shadow-sm shadow-checked-100 hover:scale-110 duration-100 transition-transform
            ${square.checked && 'bg-checked/80 text-white' }
            ${square.selectable && !square.checked && ` bg-checked/60 text-checked`}
            ${(square.selectable || square.checked) && 'cursor-pointer border-2 border-white/20 shadow-checked'}
            ${isEditing && 'border border-indigo-300 cursor-pointer'}
          `}
        >
          {(square.selectable && toggleCount) &&
            <div className='hidden sm:flex uppercase font-bold text-sm'>
              {square.count} 
            </div>
          }
        </div>
      ))}
    </div>
  )
}
