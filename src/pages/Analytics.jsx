import { useState } from 'react'
import { FaChartBar, FaChartLine, FaChartPie, FaSms, FaDownload, FaCalendarAlt, FaTrendingUp, FaTrendingDown } from 'react-icons/fa'
import { sendSMS } from '../utils/smsAPI'

function Analytics() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [selectedMetric, setSelectedMetric] = useState('yield')

  const farmMetrics = {
    yield: {
      current: '2.5 tons/hectare',
      previous: '2.2 tons/hectare',
      change: '+13.6%',
      trend: 'up',
      data: [2.1, 2.2, 2.3, 2.5, 2.4, 2.5]
    },
    revenue: {
      current: 'NAIRA 450,000',
      previous: 'NAIRA 380,000',
      change: '+18.4%',
      trend: 'up',
      data: [380000, 420000, 410000, 450000, 440000, 450000]
    },
    costs: {
      current: 'NAIRA 180,000',
      previous: 'NAIRA 200,000',
      change: '-10.0%',
      trend: 'down',
      data: [200000, 190000, 185000, 180000, 175000, 180000]
    },
    profit: {
      current: 'NAIRA 270,000',
      previous: 'NAIRA 180,000',
      change: '+50.0%',
      trend: 'up',
      data: [180000, 230000, 225000, 270000, 265000, 270000]
    }
  }

  const cropPerformance = [
    { crop: 'Maize', area: '5 hectares', yield: '3.2 tons/ha', revenue: 'NAIRA 320,000', profit: 'NAIRA 160,000' },
    { crop: 'Beans', area: '2 hectares', yield: '1.8 tons/ha', revenue: 'NAIRA 180,000', profit: 'NAIRA 90,000' },
    { crop: 'Potatoes', area: '1 hectare', yield: '25 tons/ha', revenue: 'NAIRA 125,000', profit: 'NAIRA 75,000' }
  ]

  const marketTrends = [
    { commodity: 'Maize', currentPrice: 'NAIRA 45/kg', trend: '+5%', forecast: 'Stable' },
    { commodity: 'Beans', currentPrice: 'NAIRA 120/kg', trend: '+12%', forecast: 'Rising' },
    { commodity: 'Potatoes', currentPrice: 'NAIRA 35/kg', trend: '-3%', forecast: 'Declining' }
  ]

  const weatherImpact = {
    rainfall: { amount: '850mm', impact: 'Positive', description: 'Adequate rainfall for crop growth' },
    temperature: { average: '24°C', impact: 'Optimal', description: 'Ideal temperature range' },
    humidity: { level: '65%', impact: 'Good', description: 'Suitable humidity levels' }
  }

  const sendAnalyticsReport = async () => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    const currentMetric = farmMetrics[selectedMetric]
    const message = `FARM ANALYTICS REPORT (${selectedPeriod}): ${selectedMetric.toUpperCase()} - Current: ${currentMetric.current}, Previous: ${currentMetric.previous}, Change: ${currentMetric.change}. Trend: ${currentMetric.trend === 'up' ? 'Improving' : 'Declining'}`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Analytics report sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  const sendCropReport = async (crop) => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    const message = `CROP PERFORMANCE: ${crop.crop} - Area: ${crop.area}, Yield: ${crop.yield}, Revenue: ${crop.revenue}, Profit: ${crop.profit}`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Crop report sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  const sendMarketAlert = async (market) => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    const message = `MARKET ALERT: ${market.commodity} - Current Price: ${market.currentPrice}, Trend: ${market.trend}, Forecast: ${market.forecast}`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Market alert sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Farm Analytics Dashboard</h1>
          <p className="text-gray-600">Data-driven insights for better farming decisions</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg shadow-blue-500/20 p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+254700000000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Metric</label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="yield">Yield</option>
                <option value="revenue">Revenue</option>
                <option value="costs">Costs</option>
                <option value="profit">Profit</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {Object.entries(farmMetrics).map(([key, metric]) => (
            <div key={key} className="bg-white rounded-lg shadow-lg shadow-blue-500/20 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600 uppercase">{key}</h3>
                {metric.trend === 'up' ? (
                  <FaTrendingUp className="text-green-500" />
                ) : (
                  <FaTrendingDown className="text-red-500" />
                )}
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{metric.current}</div>
              <div className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change} from previous period
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Performance Chart */}
          <div className="bg-white rounded-lg shadow-lg shadow-blue-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Performance Trend</h3>
              <FaChartLine className="text-blue-500 text-xl" />
            </div>
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <FaChartLine className="text-4xl mb-2 mx-auto" />
                <p>Chart visualization would appear here</p>
                <p className="text-sm">Showing {selectedMetric} trend over {selectedPeriod} period</p>
              </div>
            </div>
            <button
              onClick={sendAnalyticsReport}
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <FaSms className="inline mr-1" /> Send Report
            </button>
          </div>

          {/* Weather Impact */}
          <div className="bg-white rounded-lg shadow-lg shadow-blue-500/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Weather Impact</h3>
              <FaCalendarAlt className="text-blue-500 text-xl" />
            </div>
            <div className="space-y-4">
              {Object.entries(weatherImpact).map(([key, data]) => (
                <div key={key} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-800 capitalize">{key}</div>
                    <div className="text-sm text-gray-600">{data.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{data.amount || data.average || data.level}</div>
                    <div className={`text-sm ${
                      data.impact === 'Positive' || data.impact === 'Optimal' || data.impact === 'Good' 
                        ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {data.impact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Crop Performance */}
        <div className="bg-white rounded-lg shadow-lg shadow-blue-500/20 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Crop Performance Analysis</h3>
            <FaChartBar className="text-blue-500 text-xl" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Crop</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Area</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Yield</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Profit</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {cropPerformance.map((crop, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-800">{crop.crop}</td>
                    <td className="py-3 px-4 text-gray-600">{crop.area}</td>
                    <td className="py-3 px-4 text-gray-600">{crop.yield}</td>
                    <td className="py-3 px-4 text-gray-600">{crop.revenue}</td>
                    <td className="py-3 px-4 text-gray-600">{crop.profit}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => sendCropReport(crop)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                      >
                        <FaSms className="inline mr-1" /> Send
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Market Trends */}
        <div className="bg-white rounded-lg shadow-lg shadow-blue-500/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Market Trends & Forecasts</h3>
            <FaChartPie className="text-blue-500 text-xl" />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {marketTrends.map((market, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">{market.commodity}</h4>
                <div className="space-y-1 text-sm">
                  <div><span className="font-medium">Current Price:</span> {market.currentPrice}</div>
                  <div><span className="font-medium">Trend:</span> 
                    <span className={market.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                      {market.trend}
                    </span>
                  </div>
                  <div><span className="font-medium">Forecast:</span> {market.forecast}</div>
                </div>
                <button
                  onClick={() => sendMarketAlert(market)}
                  className="w-full mt-3 bg-blue-500 text-white py-1 rounded text-sm hover:bg-blue-600 transition"
                >
                  <FaSms className="inline mr-1" /> Get Alert
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
