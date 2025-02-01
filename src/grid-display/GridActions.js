import React from 'react'
import { TbEdit } from "react-icons/tb";
import { FaSave, FaCheckSquare, FaPen, FaSquare, FaEraser } from "react-icons/fa";
import { MdOutlineNumbers } from "react-icons/md";

export default function GridActions({ grid, setGrid, isEditing, toggleEdit, toggleCount, setToggleCount,
  resetActions, isChecking, setIsChecking, isAdding, setIsAdding, isFilling, setIsFilling, isErasing, setIsErasing }) {

  const EDITING_ICON_SIZE = 25


  return (
    <div className='flex justify-between'>

      {/* Actions */}
      {/* Edit Mode */}
      {isEditing &&
        <>
          <div className='flex gap-1'>
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
            <button className='px-1 hover:underline'>
              Delete
            </button>
          </div>


        </>
      }

      {/* Edit */}
      <div onClick={() => toggleEdit()}
        className={`cursor-pointer h-fit font-thin hover:italic
              ${isEditing && 'animate-pulse bg-slate-700 text-white'}
            `}
        size={EDITING_ICON_SIZE}>
        {isEditing ? <span className='px-1'>Save</span> : <span>Edit</span>}
      </div>

    </div>
  )
}
