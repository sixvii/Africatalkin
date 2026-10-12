import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-amber-500">Africa's</span>
            <span className="text-emerald-500">Talking</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-orange-500">Home</Link>
            <Link to="/farming-hub" className="text-gray-700 hover:text-orange-500">Farming Hub</Link>
            <Link to="/livestock" className="text-gray-700 hover:text-orange-500">Livestock</Link>
            <Link to="/market-info" className="text-gray-700 hover:text-orange-500">Market Info</Link>
            <Link to="/sms-center" className="text-gray-700 hover:text-orange-500">SMS Center</Link>
            <Link to="/weather" className="text-gray-700 hover:text-orange-500">Weather</Link>
            <Link to="/education" className="text-gray-700 hover:text-orange-500">Education</Link>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <Link to="/" className="block py-2 text-gray-700">Home</Link>
            <Link to="/farming-hub" className="block py-2 text-gray-700">Farming Hub</Link>
            <Link to="/livestock" className="block py-2 text-gray-700">Livestock</Link>
            <Link to="/sms-center" className="block py-2 text-gray-700">SMS Center</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
