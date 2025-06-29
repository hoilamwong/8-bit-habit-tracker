import { useParams } from "react-router";
import Grid from './Grid';
const GridPage = () => {
  let params = useParams();
  return (
    <div className="w-1/3 mx-auto">
      <Grid
        GRID_ID={params.gridId}
        GRID_ROW={15}
        GRID_COLUMN={15}
      />
    </div>
  )
}

export default GridPage
