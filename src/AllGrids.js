import { useState } from "react"
import Grid from './grid-display/Grid';
import { useNavigate } from "react-router";

const AllGrids = () => {
  // Check localStorage for existing grid keys
  const existingGrids = Object.keys(localStorage).filter(key => key.includes('grid')).sort()
  const navigate = useNavigate()
  const [grids, setGrids] = useState(existingGrids)

  return (
    <div className="mx-6 lg:mx-24">
      <div className="grid grid-cols-2 gap-10 lg:grid-cols-5 lg:gap-12">
        {grids.map((gridKey) => (
          <div className="" key={gridKey}>
            <Grid
              GRID_ID={gridKey}
              GRID_ROW={15}
              GRID_COLUMN={15}
            />
          </div>
        ))}
      </div>
    </div>

  )
}

export default AllGrids