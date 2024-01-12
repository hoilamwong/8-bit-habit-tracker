import React from 'react'
import Grid from './grid-display/Grid'
export default function App() {

  const GRID_SIZE = 72

  return (
    <div className='App bg-slate-400 h-full min-h-lvh'>
      <div className={`md:grid md:grid-cols-2 md:gap-36 justify-center px-12 w-10/12 mx-auto`}>
        <div>
          <div className='w-full border border-black'>
            <Grid
              GRID_ID='grid'
              GRID_ROW={8}
              GRID_COLUMN={11}
            />
          </div>
          <div className='w-full border border-black'>
            <Grid
              GRID_ID='grid4'
              GRID_ROW={20}
              GRID_COLUMN={11}
            />
          </div>
        </div>
        <div>
          <div className='border border-black'>
              <Grid
                GRID_ID='grid5'
                GRID_ROW={9}
                GRID_COLUMN={5}
              />
            </div>
          <div className='w-full border border-black'>
            <Grid
              GRID_ID='grid2'
              GRID_ROW={8}
              GRID_COLUMN={11}
            />
          </div>
          <div className='w-full border border-black'>
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
