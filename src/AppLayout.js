import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";

export default function AppLayout() {
    const navigate = useNavigate()

    const clearPets = () => {
        let container = document.getElementById("animationArea")
        container.innerHTML = ""
    }

    return (
        <div className='relative min-h-lvh bg-[#ded9ca] text-slate-700 select-none'>

            {/* Header */}
            <div className='overflow-hidden flex flex-row items-center px-12 py-6 pb-16'>
                <div className='border-4 border-dotted border-slate-800 rounded-2xl aspect-square h-24'>
                </div>

                <nav className='flex flex-row gap-1 mx-2 py-4 font-semibold items-center h-24'>
                    <NavLink to="/" end className='text-6xl cursor-pointer'>
                        <span className=" hover:underline">
                            Home
                        </span>
                        /
                    </NavLink >
                    <NavLink to="/grids" className='text-xl cursor-pointer'>
                        <span className=" hover:underline">
                            All
                        </span>
                        /
                    </NavLink >
                    <NavLink to="/grids/create_new" className='text-xl cursor-pointer'>
                        <span className=" hover:underline">
                            Create_New
                        </span>
                        /
                    </NavLink >
                    <div className='text-xl cursor-pointer'>
                        <span className=" hover:underline">
                            Clear_Pets
                        </span>
                        /
                    </div >

                    <div className='text-xl'>
                        ..
                    </div>
                </nav>
            </div>

            <Outlet />

            {/* <div id="animationArea" className='absolute inset-x-0 bottom-0 h-28 bg-slate-800/50'>
            </div> */}
        </div>
    );
}