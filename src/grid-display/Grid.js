import GridDisplay from './GridDisplay';
import GridActions from './GridActions';
import html2canvas from 'html2canvas';
import { useState, useEffect } from 'react';

export default function App({ GRID_ID, GRID_ROW, GRID_COLUMN }) {

	const [isEditing, setIsEditing] = useState(false)
	const [isAdding, setIsAdding] = useState(false)
	const [isFilling, setIsFilling] = useState(false)
	const [isErasing, setIsErasing] = useState(true)
	const [isChecking, setIsChecking] = useState(true)


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

	useEffect(() => {
	}, [])

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
						checked: true,
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
						selectable: true
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

	const screenshotGrid = () => {
		const input = document.getElementById(GRID_ID)
		html2canvas(input, {
			backgroundColor: null
		}).then((canvas) => {
			let img = new Image();
			img.src = canvas.toDataURL("image/png");
			img.id = `animatedImage_${GRID_ID}`;
			img.draggable = false

			// Add the image to animation container
			let container = document.getElementById("animationArea");
			container.appendChild(img);
		})
	}


	return (
		<div className="select-none p-6 pb-2 my-4">
			{/* Grid */}
			<GridDisplay
				gridId={GRID_ID}
				grid={grid}
				gridcolumn={GRID_COLUMN}
				isEditing={isEditing}
				handleSquareClick={handleSquareClick}
				toggleCount={toggleCount}
			/>

			<div className='my-2 font-bold tracking-widest'>
				{(totalChecked / totalSquare) >= 1 ?
					// Show % or Complete (Make a Pet)
					<div id="completeGrid" className="cursor-pointer animate-pulse hover:italic tracking-widest " onClick={screenshotGrid}>
						Complete!
					</div>
					:
					<div>
						{Math.trunc(totalChecked / totalSquare * 100) || 0}&nbsp;%
					</div>
				}
				<GridActions
					grid={grid}
					setGrid={setGrid}
					isEditing={isEditing}
					toggleEdit={toggleEdit}
					toggleCount={toggleCount}
					setToggleCount={setToggleCount}
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
