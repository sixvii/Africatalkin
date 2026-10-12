import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaLeaf, FaChartLine, FaSms, FaUser, FaCog, FaUsers, FaGlobe, FaThermometerHalf, FaGraduationCap, FaBug, FaDollarSign, FaCloudRain, FaBars, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { GiCow } from 'react-icons/gi'

function Sidebar({ isCollapsed, setIsCollapsed }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [location.pathname])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileOpen && !event.target.closest('.sidebar-container') && !event.target.closest('.mobile-menu-button')) {
        setIsMobileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileOpen])

  const navigationItems = [
    { to: '/', icon: FaHome, label: 'Home' },
    { to: '/farming-hub', icon: FaLeaf, label: 'Farming Hub' },
    { to: '/livestock', icon: GiCow, label: 'Livestock' },
    { to: '/market-info', icon: FaChartLine, label: 'Markets' },
    { to: '/finance', icon: FaDollarSign, label: 'Finance' },
    { to: '/weather', icon: FaThermometerHalf, label: 'Weather' },
    { to: '/pest-control', icon: FaBug, label: 'Pest Control' },
    { to: '/sms-center', icon: FaSms, label: 'SMS Center' },
    { to: '/education', icon: FaGraduationCap, label: 'Education' },
    { to: '/farmer-groups', icon: FaUsers, label: 'Groups' },
    { to: '/sustainability', icon: FaGlobe, label: 'Sustainability' },
    { to: '/climate-adaptation', icon: FaCloudRain, label: 'Climate' },
    { to: '/farmer-dashboard', icon: FaUser, label: 'Dashboard' },
    { to: '/expert-panel', icon: FaUsers, label: 'Expert Panel' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="mobile-menu-button fixed top-4 left-4 z-50 lg:hidden bg-orange-500 text-white p-3 shadow-lg hover:bg-orange-600 transition-all duration-300"
        style={{borderRadius: '2px'}}
      >
        {isMobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar-container fixed left-0 top-0 h-full bg-white shadow-xl z-40 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`} style={{borderRadius: '0 2px 2px 0'}}>
        
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <Link to="/" className="text-xl font-bold animate-slideUp">
                <span className="text-orange-500">Africa's</span>
                <span className="text-green-500">Talking</span>
              </Link>
            )}
            
            {/* Collapse Button - Desktop Only */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navigationItems.map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center px-3 py-3 transition-all duration-300 hover-lift animate-slideUp group ${
                  isActive(item.to)
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                }`}
                style={{borderRadius: '2px', animationDelay: `${index * 0.05}s`}}
              >
                <item.icon className={`text-lg transition-transform duration-200 group-hover:scale-110 ${
                  isCollapsed ? 'mx-auto' : 'mr-3'
                }`} />
                
                {!isCollapsed && (
                  <span className="font-medium transition-all duration-200">
                    {item.label}
                  </span>
                )}

                {/* Active Indicator */}
                {isActive(item.to) && !isCollapsed && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {!isCollapsed && (
            <div className="text-xs text-gray-500 text-center animate-fadeIn">
              © 2025 Africa's Talking
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Sidebar
