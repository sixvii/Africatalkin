import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaLeaf, FaChartLine, FaSms, FaUser, FaCog, FaCow, FaCalculator, FaUsers, FaGlobe, FaThermometerHalf, FaGraduationCap, FaBug, FaDollarSign, FaCloudRain, FaBars, FaTimes } from 'react-icons/fa'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { to: '/', icon: FaHome, label: 'Home' },
    { to: '/farming-hub', icon: FaLeaf, label: 'Farming Hub' },
    { to: '/livestock', icon: FaCow, label: 'Livestock' },
    { to: '/market-info', icon: FaChartLine, label: 'Markets' },
    { to: '/finance', icon: FaDollarSign, label: 'Finance' },
    { to: '/weather', icon: FaThermometerHalf, label: 'Weather' },
    { to: '/pest-control', icon: FaBug, label: 'Pest Control' },
    { to: '/sms-center', icon: FaSms, label: 'SMS Center' },
    { to: '/education', icon: FaGraduationCap, label: 'Education' },
    { to: '/farmer-groups', icon: FaUsers, label: 'Groups' },
    { to: '/sustainability', icon: FaGlobe, label: 'Sustainability' },
    { to: '/climate-adaptation', icon: FaCloudRain, label: 'Climate' }
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            <span className="text-orange-500">Africa's</span>
            <span className="text-green-500">Talking</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navigationItems.slice(0, 8).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-300 text-sm font-medium transform hover:scale-105"
              >
                <item.icon className="mr-2 text-sm transition-transform duration-200" />
                {item.label}
              </Link>
            ))}
            
            {/* More Dropdown */}
            <div className="relative group">
              <button className="flex items-center px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 text-sm font-medium">
                <FaCog className="mr-2 text-sm" />
                More
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {navigationItems.slice(8).map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-200 text-sm"
                    >
                      <item.icon className="mr-3 text-sm" />
                      {item.label}
                    </Link>
                  ))}
                  <hr className="my-2 border-gray-200" />
                  <Link
                    to="/farmer-dashboard"
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-200 text-sm"
                  >
                    <FaUser className="mr-3 text-sm" />
                    Dashboard
                  </Link>
                  <Link
                    to="/expert-panel"
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-200 text-sm"
                  >
                    <FaUsers className="mr-3 text-sm" />
                    Expert Panel
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
              >
                <item.icon className="mr-3" />
                {item.label}
              </Link>
            ))}
            
            <hr className="my-2 border-gray-200" />
            
            <Link
              to="/farmer-dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
            >
              <FaUser className="mr-3" />
              Farmer Dashboard
            </Link>
            
            <Link
              to="/expert-panel"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium"
            >
              <FaUsers className="mr-3" />
              Expert Panel
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
