import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[#4682B4] text-[#2C2C2C]'>
        <div className="mycontainer flex justify-between px-4 py-5 h-12 items-center text-lg">
        <div className="logo font-bold">PassSecure</div>
        <ul className='flex gap-4'>
            <a href="#" className='hover: font-bold'><li>Home</li></a>
            <a href="#" className='hover: font-bold'><li>About</li></a>
            <a href="#" className='hover: font-bold'><li>Contact</li></a>
        </ul>
        </div>
    </nav>
  )
}

export default Navbar