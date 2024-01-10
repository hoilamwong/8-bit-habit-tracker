import GridDisplay from './grid-display/GridDisplay';
import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './output.css';

export default function App() {

  const gridrow = 8
  const gridcolumn = 11

  const [grid, setGrid] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [totalSquare, setTotalSquare] = useState(0)

  useEffect(() => {
    makeGrid(gridrow, gridcolumn)
  }, [])

  // useEffect(() => {
  //   if (!grid) return
  //   totalSquare = grid.filter((square) => square.selectable).length
  //   console.log(totalSquare);
  //   let counter = 0
  //   const newGrid = grid.map((square) => {
  //     if (square.selectable) {
  //       const newSquare = { ...square, count: counter }
  //       counter++
  //       return newSquare
  //     } else {
  //       return square
  //     }
  //   })
  //   setGrid(newGrid)
  // }, [totalSquare])

  const makeGrid = (row, column) => {
    let gridArr = []
    // Push square to subarray 
    for (let i = 0; i < (row * column); i++) {
      // default square
      const square = {
        id: i,
        checked: false,
        selectable: false,
        count: "1",
        completeDate: "1/10/2024",
        description: "",
      }
      gridArr.push(square)
    }
    setGrid(gridArr)
  }

  /* Switch and handle action when user click a Square in Grid */
  const handleSquareClick = (e, id) => {
    e.stopPropagation()
    let newGridSquares = []
    let newTotalSquare = totalSquare
    if (isEditing) {
      // Change square selectable condition if user is editing
      newGridSquares = grid.map((square) =>
      {
        if(square.id === id){
          // Add or Minus total count based on selectable
          if(!square.selectable){
            // if the selectable will be true 
            newTotalSquare++
            setTotalSquare(newTotalSquare)
          } else {
            newTotalSquare--
            setTotalSquare(newTotalSquare)
          }
          return { ...square, selectable: !square.selectable, count: newTotalSquare }
        } else {
          return square
        }
    })
    } else {
      // Else change square checked
      newGridSquares = grid.map((square) =>
      (
        // Only change is square is selectable and matches id
        (square.id === id && square.selectable) ?
          { ...square, checked: !square.checked }
          : square
      ))
    }
    setGrid(newGridSquares)
  }

  return (
    <div className="App bg-yellow-400/10 h-screen select-none p-2">
      <div className='w-1/2'>
        <GridDisplay
          grid={grid}
          gridcolumn={gridcolumn}
          isEditing={isEditing}
          handleSquareClick={handleSquareClick}
        />
        {/* Actions */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={` border border-black cursor-pointer my-1 p-1 
          hover:animate-pulse hover:bg-slate-500
          ${isEditing && 'bg-slate-700 text-white'}
        `}
        >
          Edit {isEditing && <p> editing ... </p>}
        </button>
      </div>
    </div>
  );
}
