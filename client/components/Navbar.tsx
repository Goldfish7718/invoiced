import { CircleGauge, Info, Menu, ShoppingCart } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar bg-orange-200 flex">
        <div className='navbar-start'>
            <h4 className="text-2xl text-black underline font-bold mx-4">invoiced.</h4>
        </div>
        <div className="navbar-end">
            <div className="dropdown dropdown-end dropdown-hover">
                <button className="btn btn-ghost"><Menu size={18} className='m-2 text-black' /></button>
                <ul className="dropdown-content z-[1] shadow bg-orange-200 rounded-md w-52">
                    <li className='p-2 text-lg text-black hover:bg-orange-300 rounded-t-md hover:cursor-pointer flex items-center'>Dashboard <CircleGauge size={22} className='mx-1' /></li>
                    <li className='p-2 text-lg text-black hover:bg-orange-300 hover:cursor-pointer flex items-center'>Orders <ShoppingCart size={22} className='mx-1' /></li>
                    <li className='p-2 text-lg text-black hover:bg-orange-300 rounded-b-md hover:cursor-pointer flex items-center'>About <Info size={22} className='mx-1' /></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar