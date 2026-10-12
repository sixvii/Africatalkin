import { useState, useEffect } from 'react'
import { FaCloudRain, FaSun, FaCloud, FaSnowflake, FaWind, FaEye, FaThermometerHalf, FaTint, FaSms, FaBell, FaMapMarkerAlt, FaCalendarAlt, FaExclamationTriangle, FaLeaf } from 'react-icons/fa'
import { sendSMS } from '../utils/smsAPI'
import { weatherService } from '../utils/apiService'

function Weather() {
  const [activeTab, setActiveTab] = useState('current')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('Lagos')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [weatherAlerts, setWeatherAlerts] = useState([
    {
      id: 1,
      title: 'Heavy Rain Warning',
      description: 'Heavy rainfall expected in the next 24 hours. Prepare drainage systems.',
      location: 'Lagos',
      severity: 'High',
      validUntil: 'Jan 16, 6:00 PM'
    },
    {
      id: 2,
      title: 'Temperature Alert',
      description: 'Unusually high temperatures may affect crop growth.',
      location: 'Kano',
      severity: 'Medium',
      validUntil: 'Jan 17, 12:00 PM'
    },
    {
      id: 3,
      title: 'Harmattan Wind Alert',
      description: 'Dry dusty winds from Sahara affecting northern regions.',
      location: 'Abuja',
      severity: 'Low',
      validUntil: 'Jan 18, 8:00 AM'
    }
  ])
  const [alertType, setAlertType] = useState('all')

  const locations = ['Lagos', 'Abuja', 'Kano', 'Port Harcourt', 'Ibadan', 'Kaduna', 'Jos', 'Enugu', 'Calabar', 'Maiduguri']

  // Fetch weather data when component mounts or location changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true)
      try {
        const [currentWeather, forecast] = await Promise.all([
          weatherService.getCurrentWeather(selectedLocation),
          weatherService.getForecast(selectedLocation)
        ])

        setWeatherData({
          current: currentWeather.current,
          forecast: forecast.forecast
        })
      } catch (error) {
        console.error('Error fetching weather data:', error)
        // Fallback to mock data
        const mockData = await import('../utils/mockData.js').then(module => module.weatherData)
        setWeatherData(mockData)
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [selectedLocation])
  
  const weatherTips = [
    { condition: 'Rainy', tip: 'Perfect time for planting. Ensure proper drainage in your fields.' },
    { condition: 'Sunny', tip: 'Great for harvesting. Monitor crops for water stress.' },
    { condition: 'Cloudy', tip: 'Good conditions for transplanting seedlings.' },
    { condition: 'Windy', tip: 'Secure greenhouse structures and check irrigation systems.' }
  ]

  const extendedForecast = [
    { day: 'Today', date: 'Jan 15', high: 26, low: 18, condition: 'Sunny', rainfall: 0, humidity: 45, wind: 8, icon: FaSun },
    { day: 'Tomorrow', date: 'Jan 16', high: 24, low: 16, condition: 'Cloudy', rainfall: 5, humidity: 65, wind: 12, icon: FaCloud },
    { day: 'Wednesday', date: 'Jan 17', high: 22, low: 15, condition: 'Rainy', rainfall: 25, humidity: 85, wind: 15, icon: FaCloudRain },
    { day: 'Thursday', date: 'Jan 18', high: 25, low: 17, condition: 'Partly Cloudy', rainfall: 2, humidity: 55, wind: 10, icon: FaCloud },
    { day: 'Friday', date: 'Jan 19', high: 27, low: 19, condition: 'Sunny', rainfall: 0, humidity: 40, wind: 6, icon: FaSun },
    { day: 'Saturday', date: 'Jan 20', high: 23, low: 16, condition: 'Thunderstorm', rainfall: 35, humidity: 90, wind: 20, icon: FaCloudRain },
    { day: 'Sunday', date: 'Jan 21', high: 24, low: 17, condition: 'Cloudy', rainfall: 8, humidity: 70, wind: 14, icon: FaCloud }
  ]

  const currentWeather = [
    {
      location: 'Lagos',
      temperature: '28°C',
      humidity: '75%',
      windSpeed: '15 km/h',
      rainfall: '2mm',
      condition: 'Partly Cloudy',
      icon: FaCloud
    },
    {
      location: 'Abuja',
      temperature: '32°C',
      humidity: '45%',
      windSpeed: '8 km/h',
      rainfall: '0mm',
      condition: 'Sunny',
      icon: FaSun
    },
    {
      location: 'Kano',
      temperature: '35°C',
      humidity: '25%',
      windSpeed: '20 km/h',
      rainfall: '0mm',
      condition: 'Harmattan',
      icon: FaWind
    },
    {
      location: 'Port Harcourt',
      temperature: '30°C',
      humidity: '85%',
      windSpeed: '12 km/h',
      rainfall: '5mm',
      condition: 'Light Rain',
      icon: FaCloudRain
    },
    {
      location: 'Jos',
      temperature: '22°C',
      humidity: '60%',
      windSpeed: '10 km/h',
      rainfall: '0mm',
      condition: 'Cool',
      icon: FaCloud
    },
    {
      location: 'Ibadan',
      temperature: '29°C',
      humidity: '70%',
      windSpeed: '14 km/h',
      rainfall: '1mm',
      condition: 'Cloudy',
      icon: FaCloud
    }
  ]

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <FaSun className="text-yellow-500" />
      case 'cloudy': case 'partly cloudy': return <FaCloud className="text-gray-500" />
      case 'rainy': case 'thunderstorm': case 'light rain': return <FaCloudRain className="text-blue-500" />
      case 'snowy': return <FaSnowflake className="text-blue-300" />
      default: return <FaCloud className="text-gray-500" />
    }
  }

  const sendWeatherAlert = async (weather) => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }
    
    setLoading(true)
    const tomorrow = extendedForecast[1]
    const smsMessage = `WEATHER UPDATE (${weather?.location || selectedLocation}): Current - ${weather?.condition || weatherData.current.condition}, ${weather?.temperature || weatherData.current.temperature}°C, ${weather?.humidity || weatherData.current.humidity}% humidity. Tomorrow: ${tomorrow.condition}, High ${tomorrow.high}°C, ${tomorrow.rainfall}mm rain expected. Plan accordingly!`
    
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
    const smsMessage = `FARMING TIP: ${tip.condition} weather detected. ${tip.tip} Stay productive!`
    
    try {
      await sendSMS([phoneNumber], smsMessage)
      alert('Farming tip sent to your phone!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  const subscribeToAlerts = () => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }
    
    const newAlert = {
      id: Date.now(),
      location: selectedLocation,
      phone: phoneNumber,
      type: 'Daily Weather',
      active: true
    }
    
    alert(`Weather alerts activated for ${selectedLocation}!`)
  }

  return (
    <div className="min-h-screen bg-blue-50 py-4 sm:py-6 lg:py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4">
            🌤️ Weather Center
          </h1>
          <p className="text-sm sm:text-base text-gray-600">Real-time weather data and SMS alerts for farmers</p>
        </div>

        {/* Settings */}
        <div className="bg-white shadow-lg rounded-lg p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">📱 Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+254 XXX XXX XXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">📍 Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">🔔 Alert Type</label>
              <select
                value={alertType}
                onChange={(e) => setAlertType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="all">All Alerts</option>
                <option value="rain">Rain Alerts</option>
                <option value="temperature">Temperature Alerts</option>
                <option value="wind">Wind Alerts</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <button
              onClick={subscribeToAlerts}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium"
            >
              <FaBell className="inline mr-2" />
              Subscribe to Alerts
            </button>
            <button
              onClick={() => sendWeatherAlert()}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition text-sm font-medium"
            >
              <FaSms className="inline mr-2" />
              Send Current Weather
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-4 sm:mb-6 lg:mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto px-2 sm:px-6">
              {[
                { key: 'current', label: 'Current Weather', icon: FaThermometerHalf },
                { key: 'forecast', label: '7-Day Forecast', icon: FaCalendarAlt },
                { key: 'alerts', label: 'Weather Alerts', icon: FaExclamationTriangle },
                { key: 'tips', label: 'Farming Tips', icon: FaLeaf }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm flex items-center whitespace-nowrap min-w-max transition-all duration-200 ${
                    activeTab === tab.key 
                      ? 'border-blue-500 text-blue-600 bg-blue-50' 
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
            {/* Current Weather Tab */}
            {activeTab === 'current' && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    Current Weather Conditions
                  </h2>
                  <p className="text-sm text-gray-600">
                    Live weather data from major farming regions
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  {currentWeather.map((weather, index) => (
                    <div key={index} className="bg-white p-4 sm:p-6 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 hover-lift animate-slideUp" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{weather.location}</h3>
                        <weather.icon className="text-lg sm:text-xl text-blue-500" />
                      </div>
                      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                        <div className="flex justify-between">
                          <span>🌡️ Temperature:</span>
                          <span className="font-medium">{weather.temperature}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>💧 Humidity:</span>
                          <span>{weather.humidity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>💨 Wind:</span>
                          <span>{weather.windSpeed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>🌧️ Rainfall:</span>
                          <span>{weather.rainfall}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => sendWeatherAlert(weather)}
                        disabled={loading}
                        className="w-full mt-3 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition text-xs sm:text-sm"
                      >
                        <FaSms className="inline mr-1" />
                        Send Alert
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Weather Forecast Tab */}
            {activeTab === 'forecast' && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    7-Day Weather Forecast
                  </h2>
                  <p className="text-sm text-gray-600">
                    Plan your farming activities with extended weather forecasts
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 sm:gap-4">
                  {extendedForecast.map((day, index) => (
                    <div key={index} className="text-center p-3 sm:p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition animate-slideUp" style={{animationDelay: `${index * 0.05}s`}}>
                      <div className="text-xs sm:text-sm font-medium text-gray-600 mb-2">{day.day}</div>
                      <div className="text-xs text-gray-500 mb-2">{day.date}</div>
                      <day.icon className="text-lg sm:text-xl text-blue-500 mx-auto mb-2" />
                      <div className="text-xs sm:text-sm">
                        <div className="font-semibold text-gray-800">{day.high}°/{day.low}°</div>
                        <div className="text-gray-500 text-xs">{day.condition}</div>
                        <div className="text-blue-600 text-xs">💧 {day.rainfall}mm</div>
                        <div className="text-gray-500 text-xs">💨 {day.wind}km/h</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Weather Alerts Tab */}
            {activeTab === 'alerts' && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    Active Weather Alerts
                  </h2>
                  <p className="text-sm text-gray-600">
                    Stay informed about weather conditions that may affect your farm
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {weatherAlerts.map((alert, index) => (
                    <div key={index} className={`p-3 sm:p-4 border-l-4 rounded-r-lg animate-slideUp ${
                      alert.severity === 'High' ? 'bg-red-50 border-red-400' :
                      alert.severity === 'Medium' ? 'bg-yellow-50 border-yellow-400' :
                      'bg-blue-50 border-blue-400'
                    }`} style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <FaExclamationTriangle className={`mr-2 ${
                              alert.severity === 'High' ? 'text-red-500' :
                              alert.severity === 'Medium' ? 'text-yellow-500' :
                              'text-blue-500'
                            }`} />
                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{alert.title}</h3>
                          </div>
                          <p className="text-gray-600 mb-2 text-xs sm:text-sm">{alert.description}</p>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-xs text-gray-500">
                            <span>📍 Location: {alert.location}</span>
                            <span>⏰ Valid until: {alert.validUntil}</span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded self-start ${
                            alert.severity === 'High' ? 'bg-red-100 text-red-600' :
                            alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {alert.severity}
                          </span>
                          <button
                            onClick={() => sendWeatherAlert(alert)}
                            disabled={loading}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-gray-400 transition text-xs"
                          >
                            <FaSms className="inline mr-1" />
                            Send Alert
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Farming Tips Tab */}
            {activeTab === 'tips' && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    Weather-Based Farming Tips
                  </h2>
                  <p className="text-sm text-gray-600">
                    Expert advice based on current weather conditions
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {weatherTips.map((tip, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 animate-slideUp" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex items-center mb-3">
                        {getWeatherIcon(tip.condition)}
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base ml-3">{tip.condition} Weather</h3>
                      </div>
                      <p className="text-gray-600 mb-4 text-xs sm:text-sm leading-relaxed">{tip.tip}</p>
                      <button
                        onClick={() => sendFarmingTip(tip)}
                        disabled={loading}
                        className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition text-xs sm:text-sm w-full"
                      >
                        <FaSms className="inline mr-1" />
                        Send Tip via SMS
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
