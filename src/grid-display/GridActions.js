import React from 'react'
import { TbEdit } from "react-icons/tb";
import { FaSave, FaCheckSquare, FaPen, FaSquare, FaEraser } from "react-icons/fa";
import { MdOutlineNumbers } from "react-icons/md";

export default function GridActions({ grid, setGrid, isEditing, toggleEdit, saveGrid, toggleCount, setToggleCount,
  resetActions, isChecking, setIsChecking, isAdding, setIsAdding, isFilling, setIsFilling, isErasing, setIsErasing }) {

  const EDITING_ICON_SIZE = 25


  return (
    <div>

      {/* Actions */}
      <div className='flex items-center'>

        {/* Toggle Count */}
        <button
          onClick={() => setToggleCount(!toggleCount)}
          className={`flex items-center rounded-3xl cursor-pointer m-1 hover:mr-3 p-1 shadow-sm shadow-hover
            hover:scale-105 duration-400 ease-in transition-transform 
            ${toggleCount ? 'bg-hover/80 text-white' : 'bg-white/50 text-hover'}
          `}>
          <MdOutlineNumbers
            size={EDITING_ICON_SIZE}
            className='peer'
          />
          <span className='hidden peer-hover:inline hover:inline px-2 uppercase font-bold text-sm '>Toggle Numbers</span>
        </button>

        {/* Edit */}
        <button
          onClick={() => toggleEdit()}
          className={`flex items-center rounded-3xl cursor-pointer m-1 hover:mr-3 p-1 shadow-sm shadow-hover
            hover:scale-105 duration-400 ease-in transition-transform 
            ${isEditing ? 'bg-hover/80 text-white' : 'bg-white/50 text-hover'}
          `}>
          <TbEdit
            size={EDITING_ICON_SIZE}
            className='peer'
          />
          {isEditing ?
            <span className='uppercase font-bold text-sm'>Editing...</span>
            :
            <span className='hidden peer-hover:inline hover:inline px-2 uppercase font-bold text-sm '>Edit Grid</span>
          }
        </button>

      </div>

      {/* Edit Mode */}
      {isEditing &&
        <>
          <div className='grid grid-cols-5 text-hover gap-1'>

            {/* Toggle check Square */}
            <button
              className={`cursor-pointer p-1 rounded-lg bg-white/30 aspect-square shadow-sm shadow-hover m-auto
              hover:scale-90 duration-400 ease-in transition-transform 
                ${isChecking && 'border-hover/80 border-2 scale-105'}
                `}
              onClick={() => { resetActions(); setIsChecking(true); }}
            >
              <FaCheckSquare
                className='m-2 mx-auto my-auto'
                size={EDITING_ICON_SIZE - 5}
              />
            </button>

            {/* Add a Unchecked Selectable Mode */}
            <button
              className={`cursor-pointer p-1 rounded-lg bg-white/30 aspect-square shadow-sm shadow-hover m-auto
                hover:scale-90 duration-400 ease-in transition-transform 
                ${isAdding && 'border-hover/80 border-2 scale-105'}
                `}
              onClick={() => { resetActions(); setIsAdding(true); }}
            >
              <FaPen
                className='m-2 mx-auto my-auto'
                size={EDITING_ICON_SIZE - 5}
              />
            </button>

            {/* Add Checked Non-Selectable Sqaure Mode */}
            <button
              className={`cursor-pointer p-1 rounded-lg bg-white/30 aspect-square shadow-sm shadow-hover m-auto
               hover:scale-90 duration-400 ease-in transition-transform 
               ${isFilling && 'border-hover/80 border-2 scale-105'}
               `}
              onClick={() => { resetActions(); setIsFilling(true); }}
            >
              <FaSquare
                className='m-2 mx-auto my-auto'
                size={EDITING_ICON_SIZE - 5}
              />
            </button>

             {/* Eraser */}
            <button
              className={`cursor-pointer p-1 rounded-lg bg-white/30 aspect-square shadow-sm shadow-hover m-auto
                hover:scale-90 duration-400 ease-in transition-transform 
                ${isErasing && 'border-hover/80 border-2 scale-105'}
                `}
              onClick={() => { resetActions(); setIsErasing(true); }}
            >
              <FaEraser
                className='m-2 mx-auto my-auto'
                size={EDITING_ICON_SIZE - 5}
              />
            </button>
          </div>
          {/* <button onClick={() => { }}
            className={`cursor-pointer p-1 
                      hover:animate-pulse hover:bg-slate-500 `}
          >
            Reset Grid
          </button> */}
        </>
      }
    </div >
  )
}
