import React from 'react'
import Grid from './grid-display/Grid'
import Counter from './features/counter/Counter'

export default function App() {

  const GRID_SIZE = 72

  return (
    <div className='App min-h-lvh bg-gradient-to-tr from-indigo-200 via-red-200 to-yellow-100'>
      <div className={`lg:grid lg:grid-cols-2 lg:gap-36 justify-center py-2 w-10/12 mx-auto`}>
        <div>
          <div className='w-full '>
            <Grid
              GRID_ID='grid'
              GRID_ROW={8}
              GRID_COLUMN={11}
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
            />
          </div>
          <div className='w-full'>
            <Grid
              GRID_ID='grid3'
              GRID_ROW={8}
              GRID_COLUMN={11}
            />
          </div>
          <div>
            <Counter />
          </div>
        </div>
      </div>
    </div>
  )
}
