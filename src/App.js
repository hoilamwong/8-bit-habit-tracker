import GridDisplay from './grid-display/GridDisplay';
import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './output.css';

export default function App() {

  const gridrow = 8
  const gridcolumn = 11

  const [grid, setGrid] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    makeGrid(gridrow, gridcolumn)
  }, [])

  const makeGrid = (row, column) => {
    let gridArr = []
    // Push square to subarray 
    for (let i = 0; i < (row * column); i++) {
      // default square
      const square = {
        id: i,
        checked: false,
        selectable: false,
        date: "1/10/2024"
      }
      gridArr.push(square)
    }
    setGrid(gridArr)
  }

  const handleCheck = (id) => {
    const newGridSquares = grid.map((square) =>
    (
      // Only change is square is selectable and matches id
      (square.id === id && square.selectable) ?
        { ...square, checked: !square.checked }
        : square
    ))
    setGrid(newGridSquares)
  }

  const handleSelectable = (e, id) => {
    e.stopPropagation()

    // if it is not editing
    if(!isEditing)return

    const newGridSquares = grid.map((square) =>
    (
      // Only change is square is selectable and matches id
      (square.id === id && square.selectable) ?
        { ...square, selectable: !square.selectable }
        : square
    ))
    setGrid(newGridSquares)
  }

  /* Switch and handle action when user click a Square in Grid */
  const handleSquareClick = (e, id) => {
    e.stopPropagation()
    let newGridSquares =[]
    if(isEditing){
      // Change square selectable condition if user is editing
      newGridSquares = grid.map((square) =>
      (
        (square.id === id) ?
          { ...square, selectable: !square.selectable }
          : square
      ))
    }else{
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
    <div className="App bg-yellow-400/10 h-screen select-none">
      <div className='w-1/2'>
        <GridDisplay
          grid={grid}
          gridcolumn={gridcolumn}
          // handleCheck={handleCheck}
          // handleSelectable={handleSelectable}
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
