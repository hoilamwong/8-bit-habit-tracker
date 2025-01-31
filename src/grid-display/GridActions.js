import React from 'react'
import { TbEdit } from "react-icons/tb";
import { FaSave, FaCheckSquare, FaPen, FaSquare, FaEraser } from "react-icons/fa";
import { MdOutlineNumbers } from "react-icons/md";

export default function GridActions({ grid, setGrid, isEditing, toggleEdit, saveGrid, toggleCount, setToggleCount,
  resetActions, isChecking, setIsChecking, isAdding, setIsAdding, isFilling, setIsFilling, isErasing, setIsErasing }) {

  const EDITING_ICON_SIZE = 30


  return (
    <div className='flex'>

      {/* Actions */}

      {/* Edit */}
      <div onClick={() => toggleEdit()}
        className={`cursor-pointer px-2 h-fit font-thin hover:italic
              ${isEditing && 'animate-pulse bg-slate-700 text-white'}
            `}
        size={EDITING_ICON_SIZE}>
        {isEditing ? <span>Save</span> : <span>Edit</span>}
      </div>

      {/* Edit Mode */}
      {isEditing &&
        <>
          <div className='flex gap-1 ml-4'>
            {/* Add a Unchecked Selectable Mode */}
            <FaPen onClick={() => { resetActions(); setIsAdding(true); }}
              className={`  cursor-pointer p-1 hover:text-slate-800
              ${isAdding ? 'border-b-2 border-slate-800 text-slate-800 ' : 'text-slate-500'}
              `}
              size={EDITING_ICON_SIZE}
            />

            {/* Add Checked Non-Selectable Sqaure Mode */}
            <FaSquare onClick={() => { resetActions(); setIsFilling(true); }}
              className={`  cursor-pointer p-1 hover:text-slate-800
              ${isFilling ? 'border-b-2 border-slate-800 text-slate-800 ' : 'text-slate-500'}
              `}
              size={EDITING_ICON_SIZE}
            />

            {/* Eraser */}
            <FaEraser onClick={() => { resetActions(); setIsErasing(true); }}
              className={`  cursor-pointer p-1 hover:text-slate-800
                ${isErasing ? 'border-b-2 border-slate-800 text-slate-800 ' : 'text-slate-500'}
                `}
              size={EDITING_ICON_SIZE}
            />

            {/* Toggle check Square */}
            <FaCheckSquare onClick={() => { resetActions(); setIsChecking(true); }}
              className={`cursor-pointer p-1 hover:text-slate-800
								${isChecking ? 'border-b-2 border-slate-800 text-slate-800 ' : 'text-slate-500'}
								`}
              size={EDITING_ICON_SIZE}
            />

            {/* Toggle Count */}
            <MdOutlineNumbers onClick={() => setToggleCount(!toggleCount)}
              className={`cursor-pointer p-1 hover:text-slate-800
              ${toggleCount ? 'border-b-2 border-slate-800 text-slate-800 ' : 'text-slate-500'}
            `}
              size={EDITING_ICON_SIZE}
            />

          </div>
          {/* <button onClick={() => { }}
            className={`border-b border-x border-black cursor-pointer p-1 
                      hover:animate-pulse hover:bg-slate-500 `}
          >
            Reset Grid
          </button> */}
        </>
      }
    </div>
  )
}
