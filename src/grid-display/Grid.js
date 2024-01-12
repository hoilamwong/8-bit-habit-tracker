import GridDisplay from './GridDisplay';
import GridActions from './GridActions';
import { useState, useEffect } from 'react';

export default function App({ GRID_ID, GRID_ROW, GRID_COLUMN }) {

	// const GRID_ID = 'grid'
	// const GRID_ROW = 8
	// const GRID_COLUMN = 11

	const [isEditing, setIsEditing] = useState(false)
	const [isAdding, setIsAdding] = useState(false)
	const [isFilling, setIsFilling] = useState(false)
	const [isErasing, setIsErasing] = useState(true)
	const [isChecking, setIsChecking] = useState(true)

	// const [editingActions, setEditingActions] = useState([{
	// 	isAdding2 : false,
	// 	isFilling2 : false,
	// 	isErasing2 : false,
	// 	isChecking2 : true,
	// }])

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
	const [grid, setGrid] = useState((localStorage.getItem(GRID_ID) && localStorage.getItem(GRID_ID).length) ? JSON.parse(localStorage.getItem(GRID_ID)) : makeGrid(GRID_ROW, GRID_COLUMN))

	const [totalSquare, setTotalSquare] = useState(grid.filter((square) => square.selectable).length)
	const [toggleCount, setToggleCount] = useState(true)

	let totalChecked = grid.filter((square) => (square.checked && square.selectable)).length

	/* set count for each square when totalSquare is changed */
	// from top left to bottom right
	useEffect(() => {
		if (!grid) return
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

	/* Save grid to localstorage */
	useEffect(() => {
		localStorage.setItem(GRID_ID, JSON.stringify(grid))
	}, [grid])

	const resetActions = () => {
		// console.log(Object.values(editingActions));
		// const inverse = (x) => x.array.forEach(element => {
		// 	console.log(element);
		// });;
		// grid.map(inverse)
		// console.log(grid.map(inverse));
		// const copyArr = editingActions
		// const newActions = Object.keys(editingActions[0]).map((action, key) => {action[key] = false; return action})
		// console.log(editingActions[0].map((action, key) => {return {action[key] : false}}));
		// setEditingActions(newActions)
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
		let newTotalSquare = newGridSquares.filter((square) => square.selectable).length
		setTotalSquare(newTotalSquare)
		setGrid(newGridSquares)
	}

	const saveGrid = () => {
		console.log("save grid");
	}

	return (
		<div className="select-none p-6 pb-2 bg-white/70 rounded-lg shadow-sm my-4">
			{/* <div className='bg-white/70 rounded-lg aspect-square flex items-center justify-center p-4'> */}
				{/* Grid */}
				<GridDisplay
					grid={grid}
					gridcolumn={GRID_COLUMN}
					isEditing={isEditing}
					handleSquareClick={handleSquareClick}
					toggleCount={toggleCount}
				/>
			{/* </div> */}
			<div className='flex justify-between my-2'>
				<GridActions
					grid={grid}
					setGrid={setGrid}
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
				<div className='text-right text-sm text-indigo-400 h-fit mt-auto'>
					{/* Grid Info */}
					Total Selectable: {totalSquare} <br/>
					Checked: {totalChecked} <br/>
					Completion: {Math.trunc(totalChecked / totalSquare * 100) || 0} %
				</div>
			</div>



		</div>
	);
}
