import { useState, useEffect } from 'react'
import { FaCalculator, FaCloudRain, FaLeaf, FaBug, FaSms, FaChartLine } from 'react-icons/fa'
import { sendSMS } from '../utils/smsAPI'
import { tipsService, weatherService } from '../utils/apiService'

function FarmingHub() {
  const [activeTab, setActiveTab] = useState('calculators')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [calculatorResults, setCalculatorResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [farmingTips, setFarmingTips] = useState([])
  const [weatherData, setWeatherData] = useState(null)

  // Fertilizer Calculator
  const [farmSize, setFarmSize] = useState('')
  const [cropType, setCropType] = useState('maize')
  
  // Irrigation Calculator
  const [irrigationArea, setIrrigationArea] = useState('')
  const [soilType, setSoilType] = useState('clay')

  const calculateFertilizer = async () => {
    if (!farmSize || !phoneNumber) {
      alert('Please fill in farm size and phone number')
      return
    }
    
    setLoading(true)
    const fertilizerNeeded = parseFloat(farmSize) * 50 // 50kg per acre for maize
    const cost = fertilizerNeeded * 120 // NAIRA 120 per kg
    
    const result = {
      type: 'fertilizer',
      farmSize: farmSize,
      cropType: cropType,
      fertilizerNeeded: fertilizerNeeded,
      estimatedCost: cost
    }
    
    setCalculatorResults(result)
    
    // Send SMS with results
    const smsMessage = `FERTILIZER CALC: For ${farmSize} acres of ${cropType}, you need ${fertilizerNeeded}kg fertilizer. Est. cost: NAIRA ${cost.toLocaleString()}. Happy farming!`
    
    try {
      await sendSMS([phoneNumber], smsMessage)
      alert('Calculation sent to your phone!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    
    setLoading(false)
  }

  const calculateIrrigation = async () => {
    if (!irrigationArea || !phoneNumber) {
      alert('Please fill in irrigation area and phone number')
      return
    }
    
    setLoading(true)
    const waterNeeded = parseFloat(irrigationArea) * (soilType === 'clay' ? 25 : 35) // liters per sq meter
    const cost = waterNeeded * 0.05 // NAIRA 0.05 per liter
    
    const result = {
      type: 'irrigation',
      area: irrigationArea,
      soilType: soilType,
      waterNeeded: waterNeeded,
      estimatedCost: cost
    }
    
    setCalculatorResults(result)
    
    const smsMessage = `IRRIGATION CALC: For ${irrigationArea} sq meters (${soilType} soil), you need ${waterNeeded} liters water. Est. cost: NAIRA ${cost.toFixed(2)}. Efficient farming!`
    
    try {
      await sendSMS([phoneNumber], smsMessage)
      alert('Calculation sent to your phone!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    
    setLoading(false)
  }

  const sendWeatherAlert = async () => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }
    
    setLoading(true)
    const weather = weatherData.current
    const smsMessage = `WEATHER UPDATE: ${weather.condition}, ${weather.temperature}°C, Humidity ${weather.humidity}%. Tomorrow: ${weatherData.forecast[1].condition}, High ${weatherData.forecast[1].high}°C. Plan accordingly!`
    
    try {
      await sendSMS([phoneNumber], smsMessage)
      alert('Weather update sent to your phone!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    
    setLoading(false)
  }

  const sendFarmingTip = async (tip) => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }
    
    setLoading(true)
    try {
      await sendSMS([phoneNumber], tip.smsContent)
      alert('Farming tip sent to your phone!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
            🌾 Farming Hub
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Smart farming tools and calculators with SMS integration to help you make informed decisions
          </p>
        </div>

        {/* Phone Input Card */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📱 Phone Number for SMS Results
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+254 XXX XXX XXXX"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter your phone number to receive calculation results via SMS
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto px-2 sm:px-6 scrollbar-hide">
              {[
                { key: 'calculators', label: 'Calculators', icon: FaCalculator, color: 'green' },
                { key: 'weather', label: 'Weather', icon: FaCloudRain, color: 'blue' },
                { key: 'tips', label: 'Tips', icon: FaLeaf, color: 'emerald' },
                { key: 'pest', label: 'Pest Control', icon: FaBug, color: 'red' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm flex items-center whitespace-nowrap min-w-max transition-all duration-200 ${
                    activeTab === tab.key 
                      ? `border-${tab.color}-500 text-${tab.color}-600 bg-${tab.color}-50` 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="mr-2 text-sm sm:text-base" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {/* Calculators Tab */}
            {activeTab === 'calculators' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    🧮 Farm Calculators
                  </h2>
                  <p className="text-sm text-gray-600">
                    Calculate fertilizer needs and irrigation requirements for your farm
                  </p>
                </div>

                {/* Fertilizer Calculator */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 sm:p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-500 p-2 rounded-lg mr-3">
                      <FaLeaf className="text-white text-lg" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Fertilizer Calculator</h3>
                      <p className="text-sm text-gray-600">Calculate optimal fertilizer requirements</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Farm Size (acres)
                      </label>
                      <input
                        type="number"
                        value={farmSize}
                        onChange={(e) => setFarmSize(e.target.value)}
                        placeholder="e.g., 5"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Crop Type
                      </label>
                      <select
                        value={cropType}
                        onChange={(e) => setCropType(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
                      >
                        <option value="maize">🌽 Maize</option>
                        <option value="wheat">🌾 Wheat</option>
                        <option value="rice">🌾 Rice</option>
                        <option value="beans">🫘 Beans</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Action
                      </label>
                      <button
                        onClick={calculateFertilizer}
                        disabled={loading}
                        className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base font-medium"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Calculating...
                          </div>
                        ) : (
                          <>
                            <FaCalculator className="inline mr-2" />
                            Calculate & Send
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Irrigation Calculator */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500 p-2 rounded-lg mr-3">
                      <FaCloudRain className="text-white text-lg" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Irrigation Calculator</h3>
                      <p className="text-sm text-gray-600">Calculate water requirements for your crops</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Area (square meters)
                      </label>
                      <input
                        type="number"
                        value={irrigationArea}
                        onChange={(e) => setIrrigationArea(e.target.value)}
                        placeholder="e.g., 1000"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Soil Type
                      </label>
                      <select
                        value={soilType}
                        onChange={(e) => setSoilType(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      >
                        <option value="clay">🏺 Clay Soil</option>
                        <option value="loam">🌱 Loam Soil</option>
                        <option value="sandy">🏖️ Sandy Soil</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Action
                      </label>
                      <button
                        onClick={calculateIrrigation}
                        disabled={loading}
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base font-medium"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Calculating...
                          </div>
                        ) : (
                          <>
                            <FaCalculator className="inline mr-2" />
                            Calculate & Send
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Results Display */}
                {calculatorResults && (
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4 sm:p-6 animate-slideUp">
                    <div className="flex items-center mb-4">
                      <div className="bg-emerald-500 p-2 rounded-lg mr-3">
                        <FaChartLine className="text-white text-lg" />
                      </div>
                      <h3 className="text-lg font-semibold text-emerald-800">Calculation Results</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                      {Object.entries(calculatorResults).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center bg-white p-3 rounded-lg">
                          <span className="font-medium text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}:
                          </span>
                          <span className="font-semibold text-emerald-600">
                            {typeof value === 'number' && key.includes('Cost') 
                              ? `₦${value.toLocaleString()}` 
                              : value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
                      <p className="text-sm text-emerald-700 flex items-center">
                        <FaSms className="mr-2" />
                        Results have been sent to your phone via SMS!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Weather Tab */}
            {activeTab === 'weather' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    🌤️ Weather Information
                  </h2>
                  <p className="text-sm text-gray-600">
                    Get current weather updates for your farming location
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {weatherData.map((weather, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover-lift animate-slideUp" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex items-center mb-3">
                        <FaCloudRain className="text-blue-500 text-lg sm:text-xl mr-3" />
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{weather.location}</h3>
                      </div>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex justify-between">
                          <span>🌡️ Temperature:</span>
                          <span className="font-medium">{weather.temperature}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>💧 Humidity:</span>
                          <span>{weather.humidity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>🌧️ Rainfall:</span>
                          <span>{weather.rainfall}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => sendWeatherAlert(weather)}
                        disabled={loading}
                        className="w-full mt-4 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition text-xs sm:text-sm"
                      >
                        <FaSms className="inline mr-1" />
                        Send Weather Alert
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips Tab */}
            {activeTab === 'tips' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    💡 Farming Tips
                  </h2>
                  <p className="text-sm text-gray-600">
                    Expert farming advice and best practices for better yields
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {farmingTips.map((tip, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover-lift animate-slideUp" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex items-center mb-3">
                        <FaLeaf className="text-green-500 text-lg sm:text-xl mr-3" />
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{tip.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4 text-xs sm:text-sm leading-relaxed">{tip.content}</p>
                      <div className="flex flex-col sm:flex-row gap-2 items-start">
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">
                          {tip.category}
                        </span>
                        <button
                          onClick={() => sendFarmingTip(tip)}
                          disabled={loading}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition text-xs font-medium"
                        >
                          <FaSms className="inline mr-1" />
                          Send Tip
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pest Control Tab */}
            {activeTab === 'pest' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    🐛 Pest Control
                  </h2>
                  <p className="text-sm text-gray-600">
                    Identify and manage common pests affecting your crops
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6">
                  <div className="flex items-center mb-3">
                    <FaBug className="text-yellow-600 text-lg mr-3" />
                    <h3 className="font-semibold text-gray-800">Pest Control Information</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    This section is under development. Soon you'll be able to identify pests, 
                    get treatment recommendations, and receive SMS alerts about pest outbreaks in your area.
                  </p>
                  <button
                    disabled
                    className="mt-4 bg-gray-400 text-white px-4 py-2 rounded-lg text-sm cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FarmingHub
