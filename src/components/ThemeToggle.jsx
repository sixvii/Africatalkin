import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-4 bg-gray-400 hover:bg-gray-500 transition-all duration-300 transform hover:scale-110 shadow-lg"
      style={{ borderRadius: '50%' }}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <FaSun className="text-white text-xl" />
      ) : (
        <FaMoon className="text-white text-xl" />
      )}
    </button>
  )
}

export default ThemeToggle