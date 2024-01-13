import React from 'react'
import Grid from './grid-display/Grid'
import word from './grid-display/defaults/pattern'
import heart from './grid-display/defaults/heart'

export default function App() {
  const GRID_SIZE = 72

  return (
    <div className='App min-h-lvh bg-gradient-to-tr from-indigo-200 via-red-200 to-yellow-100'>
      <div className={`lg:grid lg:grid-cols-2 lg:gap-24 justify-center py-2 w-10/12 mx-auto`}>
        <div>
          <div className='w-full '>
            <Grid
              GRID_ID='grid'
              GRID_ROW={8}
              GRID_COLUMN={11}
              DEFAULT_GRID = {heart}
            />
          </div>
          <div className='w-full '>
            <Grid
              GRID_ID='grid4'
              GRID_ROW={20}
              GRID_COLUMN={11}
            />
          </div>
        </div>
        <div>
          <div className=''>
              <Grid
                GRID_ID='grid5'
                GRID_ROW={8}
                GRID_COLUMN={8}
              />
            </div>
          <div className='w-full '>
            <Grid
              GRID_ID='grid2'
              GRID_ROW={18}
              GRID_COLUMN={11}
              DEFAULT_GRID={word}
            />
          </div>
          <div className='w-full'>
            <Grid
              GRID_ID='grid3'
              GRID_ROW={8}
              GRID_COLUMN={11}
            />
          </div>
        </div>
      </div>

    </div>
  )
}
