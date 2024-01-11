import GridDisplay from './grid-display/GridDisplay';
import { useState, useEffect } from 'react';
import './output.css';
import GridActions from './grid-display/GridActions';

export default function App() {

	const GRID_ID = 'grid'

	const [isEditing, setIsEditing] = useState(false)
	const [isAdding, setIsAdding] = useState(false)
	const [isFilling, setIsFilling] = useState(false)
	const [isErasing, setIsErasing] = useState(true)
	const [isChecking, setIsChecking] = useState(true)

	const gridrow = 8
	const gridcolumn = 11
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
		return gridArr
	}
	const [grid, setGrid] = useState((localStorage.getItem(GRID_ID) && localStorage.getItem(GRID_ID).length)?  JSON.parse(localStorage.getItem(GRID_ID)): makeGrid(gridrow, gridcolumn))

	const [totalSquare, setTotalSquare] = useState(0)
	const [toggleCount, setToggleCount] = useState(true)

	/* set count for each square when totalSquare is changed */
	// from top left to bottom right
	useEffect(() => {
		if (!grid) return
		// console.log(newTotalSquare);
		let counter = 1
		const newGrid = grid.map((square) => {
			if (square.selectable) {
				const newSquare = { ...square, count: counter }
				counter++
				return newSquare
			} else {
				return square
			}
		})
		setGrid(newGrid)
	}, [totalSquare])

	useEffect(() => {
		localStorage.setItem('grid', JSON.stringify(grid))
	}, [grid])

	// const makeGrid = (row, column) => {
	// 	let gridArr = []
	// 	// Push square to subarray 
	// 	for (let i = 0; i < (row * column); i++) {
	// 		// default square
	// 		const square = {
	// 			id: i,
	// 			checked: false,
	// 			selectable: false,
	// 			count: "1",
	// 			completeDate: "1/10/2024",
	// 			description: "",
	// 		}
	// 		gridArr.push(square)
	// 	}
	// 	setGrid(gridArr)
	// }

	const resetActions = () => {
		setIsFilling(false)
		setIsAdding(false)
		setIsChecking(false)
		setIsErasing(false)
	}

	const toggleEdit = () => {
		resetActions()
		// Auto set isAdding to match edit mode
		setIsAdding(!isEditing)
		setIsEditing(!isEditing)
		// Set isChecking to true when edit is false
		setIsChecking(isEditing)
	}

	/* Switch and handle action when user click a Square in Grid */
	const handleSquareClick = (e, id) => {
		e.stopPropagation()
		let newGridSquares = []

		/* Editing Mode */
		if (isEditing) {

			// Special case is when square is selectable and checked ! Need to double check with user

			/* Add Filled In Square */
			if (isFilling) {
				newGridSquares = grid.map((square) => (square.id === id ?
					{
						...square,
						checked: ((square.selectable && square.checked) ? true : !square.checked),
						selectable: false
					}
					: square
				))
			}

			/* Add Unchecked Selectable */
			if (isAdding) {
				newGridSquares = grid.map((square) => (square.id === id ?
					{
						...square,
						checked: false,
						// if square is checked and selectable, stay selectable
						// else inverse it 
						selectable: ((square.selectable && square.checked) ? true : !square.selectable)
					}
					: square
				))
			}

			/* Reset Square */
			if (isErasing) {
				newGridSquares = grid.map((square) => (square.id === id ?
					{
						...square,
						checked: false,
						selectable: false
					}
					: square
				))
			}
		}
		/* Toggle Check Mode */
		if (isChecking) {
			// Else change square checked
			newGridSquares = grid.map((square) =>
			(
				// Only change is square is selectable and matches id
				(square.id === id && square.selectable) ?
					{ ...square, checked: !square.checked }
					: square
			))
		}
		let newTotalSquare = grid.filter((square) => square.selectable).length
		setTotalSquare(newTotalSquare)
		setGrid(newGridSquares)
	}

	const saveGrid = () => {
		console.log("save grid");
		const newSaveGrid = localStorage.setItem('grid')
	}

	return (
		<div className="App bg-yellow-400/10 h-screen select-none p-2">
			<div className='w-1/2'>

				{/* Grid */}
				<GridDisplay
					grid={grid}
					gridcolumn={gridcolumn}
					isEditing={isEditing}
					handleSquareClick={handleSquareClick}
					toggleCount={toggleCount}
				/>

				<GridActions
					isEditing={isEditing}
					toggleEdit={toggleEdit}
					toggleCount={toggleCount}
					setToggleCount={setToggleCount}
					saveGrid={saveGrid}
					resetActions={resetActions} 
					isChecking={isChecking}
					setIsChecking={setIsChecking} 
					isAdding={isAdding}
					setIsAdding={setIsAdding} 
					isFilling={isFilling}
					setIsFilling={setIsFilling} 
					isErasing={isErasing}
					setIsErasing={setIsErasing}
				/>
			</div>
		</div>
	);
}
