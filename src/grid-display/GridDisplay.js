import React, { useEffect, useState } from 'react'

export default function GridDisplay({ grid, gridcolumn, handleSquareClick, isEditing, toggleCount }) {

  // let getGridWidth = document.getElementById('grid').offsetWidth
  const [overSquareId, setOverSquareId] = useState(null)
  const handleMouseOver = (e, id) => {
    console.log(id);
    
    // prevent multiple toggling
    if(overSquareId == id) return
    setOverSquareId(id)
    if(e.buttons === 1 || e.buttons === 3){
      handleSquareClick(e, id)
    }
  }

  return (
    <div
      className={'grid w-full rounded-sm border-4 border-slate-400/30 border-dashed '} 
      style={{ 
        gridTemplateColumns: `repeat(${gridcolumn}, minmax(0, 1fr))`
      }}
    >
      {/* Individual Square */}
      {grid && grid.map((square) => (
        <div
          key={`square-${square.id}`}
          // onClick={(e) => handleSquareClick(e, square.id)}
          onMouseDown={(e) => handleSquareClick(e, square.id)}
          onMouseOver={(e) => handleMouseOver(e, square.id)}
          className={`h-full w-full aspect-square justify-center items-center flex text-sm hover:scale-110 duration-100 transition-transform
            ${square.checked && 'bg-slate-800 text-white' }
            ${square.selectable && !square.checked && `cursor-pointer bg-slate-500/50`}
            ${!square.selectable && 'cursor-not-allowed'}
            ${(square.selectable || square.checked) && 'border border-[#ded9ca]/50'}
            ${isEditing && 'border border-slate-100/30 cursor-pointer'}
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
