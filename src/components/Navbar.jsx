import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-800 text-white py-2'>
        <div className="logo">
            <span className="font-bold text-xl mx-2 md:mx-8">i-Task </span> 
        </div>
        <ul className="flex gap-2 mx-2 md:gap-9 md:mx-9">
            <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all '>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
