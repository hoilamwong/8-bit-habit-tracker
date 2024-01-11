import React from 'react'
import { TbEdit } from "react-icons/tb";
import { FaSave, FaCheckSquare, FaPen, FaSquare, FaEraser } from "react-icons/fa";
import { MdOutlineNumbers } from "react-icons/md";

export default function GridActions({ isEditing, toggleEdit, saveGrid, toggleCount, setToggleCount,
  resetActions, isChecking, setIsChecking, isAdding, setIsAdding, isFilling, setIsFilling, isErasing, setIsErasing }) {

  const EDITING_ICON_SIZE = 30

  return (
    <div>

      {/* Actions */}
      <div className='flex'>
        {/* Edit */}
        <TbEdit onClick={() => toggleEdit()}
          className={` border border-black cursor-pointer my-1 p-1 
              hover:animate-pulse hover:bg-slate-500
              ${isEditing && 'bg-slate-700 text-white animate-pulse'}
            `}
          size={EDITING_ICON_SIZE}
        />

        {/* Save Maybe Unnecessary*/}
        {/* <FaSave onClick={() => saveGrid()}
          className={` flex items-center border border-black cursor-pointer my-1 p-1 
              hover:animate-pulse hover:bg-slate-500
            `}
          size={EDITING_ICON_SIZE}
        /> */}
        {/* Toggle Count */}

        <MdOutlineNumbers onClick={() => setToggleCount(!toggleCount)}
          className={` border border-black cursor-pointer my-1 p-1 
              hover:animate-pulse hover:bg-slate-500
              ${toggleCount && 'bg-slate-700 text-white'}
            `}
          size={EDITING_ICON_SIZE}
        />

      </div>

      {/* Edit Mode */}
      {isEditing &&
        <div className='flex '>
          {/* Toggle check Square */}
          <FaCheckSquare onClick={() => { resetActions(); setIsChecking(true); }}
            className={` border border-black cursor-pointer p-1 
								hover:animate-pulse hover:bg-slate-500
								${isChecking && 'bg-slate-700 text-white '}
								`}
            size={EDITING_ICON_SIZE}
          />


          {/* Add a Unchecked Selectable Mode */}
          <FaPen onClick={() => { resetActions(); setIsAdding(true); }}
            className={` border border-black cursor-pointer p-1 
              hover:animate-pulse hover:bg-slate-500
              ${isAdding && 'bg-slate-700 text-white'}
              `}
            size={EDITING_ICON_SIZE}
          />

          {/* Add Checked Non-Selectable Sqaure Mode */}
          <FaSquare onClick={() => { resetActions(); setIsFilling(true); }}
            className={` border border-black cursor-pointer p-1 
              hover:animate-pulse hover:bg-slate-500
              ${isFilling && 'bg-slate-700 text-white'}
              `}
            size={EDITING_ICON_SIZE}
          />


          {/* Eraser */}
          <FaEraser onClick={() => { resetActions(); setIsErasing(true); }}
            className={` border border-black cursor-pointer p-1 
                hover:animate-pulse hover:bg-slate-500
                ${isErasing && 'bg-slate-700 text-white'}
                `}
            size={EDITING_ICON_SIZE}
          />
        </div>
      }
    </div>
  )
}
