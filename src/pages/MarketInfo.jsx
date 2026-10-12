import { useState, useEffect } from 'react'
import { FaChartLine, FaArrowUp, FaArrowDown, FaSms, FaBell, FaMapMarkerAlt } from 'react-icons/fa'
import { sendSMS } from '../utils/smsAPI'
import { marketService } from '../utils/apiService'

function MarketInfo() {
  const [activeTab, setActiveTab] = useState('prices')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedMarket, setSelectedMarket] = useState('all')
  const [priceAlerts, setPriceAlerts] = useState([])
  const [loading, setLoading] = useState(false)
  const [marketPrices, setMarketPrices] = useState({ crops: [], livestock: [] })

  const markets = ['Nairobi', 'Mombasa', 'Nakuru', 'Kisumu', 'Eldoret']

  // Fetch market prices when component mounts
  useEffect(() => {
    const fetchMarketPrices = async () => {
      setLoading(true)
      try {
        const prices = await marketService.getMarketPrices()
        setMarketPrices(prices)
      } catch (error) {
        console.error('Error fetching market prices:', error)
        // Fallback to mock data
        const mockData = await import('../utils/mockData.js').then(module => module.marketPrices)
        setMarketPrices(mockData)
      } finally {
        setLoading(false)
      }
    }

    fetchMarketPrices()
  }, [])

  const demandForecast = [
    { crop: 'Maize', demand: 'High', season: 'Dry Season', price_trend: 'up', confidence: 85 },
    { crop: 'Beans', demand: 'Medium', season: 'Rainy Season', price_trend: 'stable', confidence: 72 },
    { crop: 'Potatoes', demand: 'High', season: 'All Year', price_trend: 'up', confidence: 90 },
    { crop: 'Tomatoes', demand: 'Low', season: 'Rainy Season', price_trend: 'down', confidence: 68 }
  ]

  const sendPriceAlert = async (item) => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }
    
    setLoading(true)
    const changeIcon = item.change.includes('+') ? '📈' : '📉'
    const smsMessage = `MARKET ALERT: ${item.name} - NAIRA ${item.price}/${item.unit} ${changeIcon} ${item.change} in ${item.market} market. Trade wisely!`
    
    try {
      await sendSMS([phoneNumber], smsMessage)
      alert('Price alert sent to your phone!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  const sendMarketSummary = async () => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }
    
    setLoading(true)
    const topCrops = marketPrices.crops.slice(0, 3)
    const summary = topCrops.map(crop => `${crop.name}: NAIRA ${crop.price}/${crop.unit} (${crop.change})`).join(', ')
    const smsMessage = `MARKET SUMMARY: ${summary}. Best trading opportunities today! Happy farming!`
    
    try {
      await sendSMS([phoneNumber], smsMessage)
      alert('Market summary sent to your phone!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  const sendDemandForecast = async (forecast) => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }
    
    setLoading(true)
    const trendEmoji = forecast.price_trend === 'up' ? '📈' : forecast.price_trend === 'down' ? '📉' : '➡️'
    const smsMessage = `DEMAND FORECAST: ${forecast.crop} - ${forecast.demand} demand expected. Price trend: ${trendEmoji} ${forecast.price_trend}. Confidence: ${forecast.confidence}%. Plan accordingly!`
    
    try {
      await sendSMS([phoneNumber], smsMessage)
      alert('Demand forecast sent to your phone!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  const subscribeToPriceAlerts = async (itemName) => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }
    
    const newAlert = {
      id: Date.now(),
      item: itemName,
      phone: phoneNumber,
      threshold: 'Any change',
      active: true
    }
    
    setPriceAlerts(prev => [...prev, newAlert])
    alert(`Price alerts activated for ${itemName}!`)
  }

  return (
    <div className="min-h-screen bg-white py-4 sm:py-6 lg:py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Market Intelligence</h1>
          <p className="text-sm sm:text-base text-gray-600 px-2">Real-time market prices and trends with SMS alerts</p>
        </div>

        {/* Settings */}
        <div className="bg-white shadow-lg shadow-orange-500/20 p-4 sm:p-6 mb-6 sm:mb-8" style={{borderRadius: '2px'}}>
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number for Alerts</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+254700000000"
              className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
              style={{borderRadius: '2px'}}
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white shadow-lg shadow-orange-500/20 mb-6 sm:mb-8" style={{borderRadius: '2px'}}>
          <div className="border-b border-gray-200">
            <nav className="flex space-x-2 sm:space-x-4 lg:space-x-8 px-2 sm:px-4 lg:px-6 overflow-x-auto">
              {[
                { id: 'prices', label: 'Current Prices', icon: FaChartLine },
                { id: 'trends', label: 'Market Trends', icon: FaArrowUp },
                { id: 'forecast', label: 'Demand Forecast', icon: FaChartLine },
                { id: 'alerts', label: 'Price Alerts', icon: FaBell }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 sm:py-4 px-1 sm:px-2 border-b-2 font-medium text-xs sm:text-sm flex items-center whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'border-orange-500 text-orange-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-3 sm:p-4 lg:p-6">
            {/* Current Prices Tab */}
            {activeTab === 'prices' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-800">Live Market Prices</h3>
                  <button
                    onClick={sendMarketSummary}
                    disabled={loading || !phoneNumber}
                    className="bg-orange-500 text-white px-3 sm:px-4 py-2 hover:bg-orange-600 transition disabled:opacity-50 flex items-center justify-center text-sm sm:text-base"
                    style={{borderRadius: '2px'}}
                  >
                    <FaSms className="mr-2" />
                    {loading ? 'Sending...' : 'SMS Summary'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {marketPrices.crops.map((crop, index) => (
                    <div key={index} className="bg-white border border-gray-200 p-3 sm:p-4 hover:shadow-lg transition-all duration-300 hover-lift animate-slideUp" style={{borderRadius: '2px', animationDelay: `${index * 0.1}s`}}>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 transition-colors duration-200 text-sm sm:text-base">{crop.name}</h4>
                          <p className="text-xl sm:text-2xl font-bold text-green-600 transition-all duration-200">NAIRA {crop.price}/{crop.unit}</p>
                          <p className={`text-xs sm:text-sm ${crop.change.startsWith('+') ? 'text-green-500' : 'text-red-500'} transition-colors duration-200`}>
                            {crop.change} from yesterday
                          </p>
                        </div>
                        <button
                          onClick={() => subscribeToPriceAlerts(crop.name)}
                          className="bg-orange-500 text-white px-2 sm:px-3 py-1 sm:py-2 hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
                          style={{borderRadius: '2px'}}
                        >
                          <FaSms className="inline mr-1 transition-transform duration-200" /> Alert
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Market Trends Tab */}
            {activeTab === 'trends' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Market Trends Analysis</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-medium text-green-800 mb-3">Rising Prices</h4>
                    <div className="space-y-2">
                      {marketPrices.crops.filter(crop => crop.change.includes('+')).map((crop, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-green-700">{crop.name}</span>
                          <span className="text-green-600 font-medium">{crop.change}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="font-medium text-red-800 mb-3">Falling Prices</h4>
                    <div className="space-y-2">
                      {marketPrices.crops.filter(crop => crop.change.includes('-')).map((crop, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-red-700">{crop.name}</span>
                          <span className="text-red-600 font-medium">{crop.change}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Demand Forecast Tab */}
            {activeTab === 'forecast' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Demand Forecasting</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {demandForecast.map((forecast, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium text-gray-800 text-lg">{forecast.crop}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          forecast.demand === 'High' ? 'bg-green-100 text-green-800' :
                          forecast.demand === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {forecast.demand} Demand
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-600">
                          <span className="font-medium">Season:</span> {forecast.season}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Price Trend:</span> 
                          <span className={`ml-2 ${
                            forecast.price_trend === 'up' ? 'text-green-600' :
                            forecast.price_trend === 'down' ? 'text-red-600' :
                            'text-gray-600'
                          }`}>
                            {forecast.price_trend === 'up' ? '📈 Rising' :
                             forecast.price_trend === 'down' ? '📉 Falling' :
                             '➡️ Stable'}
                          </span>
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Confidence:</span> {forecast.confidence}%
                        </p>
                      </div>

                      <button
                        onClick={() => sendDemandForecast(forecast)}
                        disabled={loading || !phoneNumber}
                        className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50 flex items-center justify-center"
                      >
                        <FaSms className="mr-2" />
                        {loading ? 'Sending...' : 'SMS Forecast'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price Alerts Tab */}
            {activeTab === 'alerts' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Active Price Alerts</h3>
                {priceAlerts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FaBell className="text-4xl mx-auto mb-4 opacity-50" />
                    <p>No active price alerts. Subscribe to items from the Current Prices tab.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {priceAlerts.map(alert => (
                      <div key={alert.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-gray-800">{alert.item}</h4>
                          <p className="text-gray-600 text-sm">Phone: {alert.phone}</p>
                          <p className="text-gray-600 text-sm">Threshold: {alert.threshold}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            alert.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {alert.active ? 'Active' : 'Inactive'}
                          </span>
                          <button
                            onClick={() => setPriceAlerts(prev => prev.filter(a => a.id !== alert.id))}
                            className="text-red-500 hover:text-red-600 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketInfo
