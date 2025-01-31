import React, { useEffect, useState } from 'react'
import Grid from './grid-display/Grid'
import Counter from './features/counter/Counter'

export default function App() {
  // Check localStorage for existing grid keys
  const existingGrids = Object.keys(localStorage).filter(key => key.includes('grid')).sort()
  const [grids, setGrids] = useState(existingGrids)

  // Find the highest grid id
  const highestGridId = () => {
    const existingGrids = Object.keys(localStorage).filter(key => key.includes('grid'))
    const highestID = existingGrids.reduce((highest, currentId) => {
      const match = currentId.match(/grid(\d+)/)
      if (match) {
        const num = parseInt(match[1])
        return num > highest ? num : highest;
      }
      return highest
    }, -1)
    return highestID
  }

  const addGrid = () => {
    const newId = highestGridId() + 1
    const newGridKey = `grid${newId}`
    setGrids(prevGrid => [...prevGrid, newGridKey])

    setTimeout(() => {
      const container = document.querySelector('.overflow-x-auto')
      if (container) {
        const gridWidth = 300
        const newPosition = 480 + gridWidth * (grids.length - 1) // scroll to the new last item
        container.scrollLeft += newPosition
      }
    }, 100)
  }

  return (
    <div className='App relative min-h-lvh bg-[#ded9ca] text-slate-700 select-none'>

      {/* Header */}
      <div className='flex flex-row items-center p-12 pb-4'>
        <div className='border-4 border-dotted border-slate-800 rounded-2xl aspect-square h-24'>
        </div>

        <div className='flex flex-row gap-1 mx-2 py-4 font-semibold items-center h-24 '>
          <div className='text-6xl'>
            Home/
          </div>
          <div className='text-xl'>
            All/
          </div>
          <div className='text-xl'>
            Edit/
          </div>
          <div className='text-xl'>
            ..
          </div>
        </div>
      </div>

      {/* Main */}
      <div
        className="flex w-5/6 mx-auto h-[600px] pr-24 snap-x overflow-x-auto 
              scrollbar scrollbar-thumb-slate-700/30 scrollbar-track-[#ded9ca]"
        onScroll={(e) => {
          const itemWidth = 300 //base width of each grid
          const container = e.currentTarget
          const gridContainers = container.children;
          const totalContainer = gridContainers.length

          // Reset all grid containers to 300px
          Array.from(gridContainers).forEach((div) => {
            div.style.width = '300px';
            div.style.transition = 'width 0.2s ease';
          });
          const currentIndex = Math.min(Math.max(0, Math.round((container.scrollLeft) / itemWidth)), totalContainer - 1)
          // Set focused container to 480px
          if (gridContainers[currentIndex]) {
            gridContainers[currentIndex].style.width = '480px';
          }
        }}
      >
        {grids.map((gridKey) => (
          <div className='relative shrink-0 scroll-ml-6 snap-start w-[300px] first:w-[480px]' key={gridKey}>
            <Grid
              GRID_ID={gridKey}
              GRID_ROW={15}
              GRID_COLUMN={15}
            />
          </div>
        ))}

        {/* Right Side */}
        <div
          className='my-24 flex flex-col justify-center items-center font-bold 
            hover:bg-slate-600/10 bg-amber-600/20  last:mr-[calc(100%-300px)] '
          onClick={addGrid}
        >
          <svg className="hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 24 24" fill="none">
            <g id="Edit / Add_Plus">
              <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
          A D D
        </div>
      </div>


      {/* Footer */}
      <div className='absolute inset-x-0 bottom-0 h-28 bg-slate-900'>
      </div>

    </div>
  )
}
