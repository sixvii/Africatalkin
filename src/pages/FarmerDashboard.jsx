import { useState, useEffect } from 'react'
import { 
  FaUser, FaLeaf, FaChartLine, FaCalendarAlt, FaCloudRain, 
  FaMoneyBillWave, FaSms, FaBell, FaEdit, FaPlus, FaEye,
  FaTractor, FaSeedling, FaThermometerHalf, FaTint, FaTimes
} from 'react-icons/fa'
import { GiCow } from 'react-icons/gi'
import { sendSMS } from '../utils/smsAPI'

function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)

  // Mock farmer data
  const [farmerProfile] = useState({
    name: 'Timothy',
    location: 'Alegomeji, Lagos',
    farmSize: '5.2 acres',
    joinDate: 'July 2025',
    phone: '+2549032066315',
    crops: ['Maize', 'Beans', 'Potatoes'],
    livestock: ['Dairy Cows', 'Chickens']
  })

  const [farmStats] = useState({
    totalRevenue: 'NAIRA 450,000',
    totalCosts: 'NAIRA 180,000',
    netProfit: 'NAIRA 270,000',
    yieldPerAcre: '2.5 tons',
    activeCrops: 3,
    livestock: 25
  })

  const [recentActivities] = useState([
    { id: 1, type: 'harvest', description: 'Harvested 2 tons of maize', date: '2025-04-15', icon: FaLeaf },
    { id: 2, type: 'expense', description: 'Purchased fertilizer - NAIRA 15,000', date: '2025-06-12', icon: FaMoneyBillWave },
    { id: 3, type: 'livestock', description: 'Vaccinated 10 dairy cows', date: '2025-01-10', icon: GiCow },
    { id: 4, type: 'weather', description: 'Received weather alert via SMS', date: '2025-01-10', icon: FaCloudRain }
  ])

  const [crops] = useState([
    { 
      id: 1, 
      name: 'Maize', 
      area: '2.5 acres', 
      plantingDate: '2025-05-15', 
      expectedHarvest: '2025-07-15',
      status: 'Growing',
      progress: 65
    },
    { 
      id: 2, 
      name: 'Beans', 
      area: '1.5 acres', 
      plantingDate: '2024-04-01', 
      expectedHarvest: '2025-06-30',
      status: 'Flowering',
      progress: 45
    },
    { 
      id: 3, 
      name: 'Potatoes', 
      area: '1.2 acres', 
      plantingDate: '2025-02-20', 
      expectedHarvest: '2025-07-20',
      status: 'Ready to Harvest',
      progress: 95
    }
  ])

  const [weatherData] = useState({
    current: { temp: '24°C', condition: 'Partly Cloudy', humidity: '65%' },
    forecast: [
      { day: 'Today', high: '26°C', low: '18°C', condition: 'Sunny' },
      { day: 'Tomorrow', high: '28°C', low: '20°C', condition: 'Cloudy' },
      { day: 'Wednesday', high: '25°C', low: '17°C', condition: 'Rain' }
    ]
  })

  const [showAddCropModal, setShowAddCropModal] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [showLivestockModal, setShowLivestockModal] = useState(false)
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false)

  // New crop form state
  const [newCrop, setNewCrop] = useState({
    name: '',
    area: '',
    plantingDate: '',
    expectedHarvest: ''
  })

  // Expense form state
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'fertilizer',
    date: ''
  })

  // Livestock form state
  const [newLivestock, setNewLivestock] = useState({
    type: '',
    count: '',
    healthStatus: 'Healthy'
  })

  const addNewCrop = () => {
    if (!newCrop.name || !newCrop.area || !newCrop.plantingDate) {
      alert('Please fill all required fields')
      return
    }
    
    // Add crop logic here
    alert(`New crop ${newCrop.name} added successfully!`)
    setShowAddCropModal(false)
    setNewCrop({ name: '', area: '', plantingDate: '', expectedHarvest: '' })
  }

  const recordExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.date) {
      alert('Please fill all required fields')
      return
    }
    
    // Record expense logic here
    alert(`Expense of NAIRA ${newExpense.amount} recorded successfully!`)
    setShowExpenseModal(false)
    setNewExpense({ description: '', amount: '', category: 'fertilizer', date: '' })
  }

  const updateLivestock = () => {
    if (!newLivestock.type || !newLivestock.count) {
      alert('Please fill all required fields')
      return
    }
    
    // Update livestock logic here
    alert(`${newLivestock.count} ${newLivestock.type} added successfully!`)
    setShowLivestockModal(false)
    setNewLivestock({ type: '', count: '', healthStatus: 'Healthy' })
  }

  const sendDashboardReport = async () => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    setLoading(true)
    const message = `FARM DASHBOARD REPORT: Revenue: ${farmStats.totalRevenue}, Profit: ${farmStats.netProfit}, Active Crops: ${farmStats.activeCrops}, Livestock: ${farmStats.livestock}. Keep up the great work!`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Dashboard report sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  const sendCropUpdate = async (crop) => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    setLoading(true)
    const message = `CROP UPDATE: ${crop.name} (${crop.area}) - Status: ${crop.status}, Progress: ${crop.progress}%, Expected Harvest: ${crop.expectedHarvest}`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Crop update sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 shadow-xl border border-gray-200 p-8 mb-8 relative overflow-hidden" style={{borderRadius: '2px'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl -translate-y-48 translate-x-48" style={{borderRadius: '2px'}}></div>
          
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center mb-6 lg:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 blur-lg opacity-75" style={{borderRadius: '2px'}}></div>
                <div className="relative bg-gradient-to-r from-emerald-400 to-blue-500 p-4" style={{borderRadius: '2px'}}>
                  <FaUser className="text-white text-3xl" />
                </div>
              </div>
              <div className="ml-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  Welcome back, <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">{farmerProfile.name}</span>!
                </h1>
                <p className="text-gray-600 text-lg">{farmerProfile.location} • {farmerProfile.farmSize}</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <FaCalendarAlt className="mr-2" />
                  Member since {farmerProfile.joinDate}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone number for SMS"
                  className="px-6 py-3 bg-white border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-800 placeholder-gray-400 shadow-sm transition-all duration-300"
                  style={{borderRadius: '2px'}}
                />
              </div>
              <button
                onClick={sendDashboardReport}
                disabled={loading}
                className="relative group bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-3 font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105"
                style={{borderRadius: '2px'}}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{borderRadius: '2px'}}></div>
                <div className="relative flex items-center">
                  <FaSms className="mr-2" />
                  {loading ? 'Sending...' : 'SMS Report'}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white shadow-xl border border-gray-200 mb-8 overflow-hidden" style={{borderRadius: '2px'}}>
          <div className="p-2">
            <nav className="flex space-x-2">
              {[
                { id: 'overview', label: 'Overview', icon: FaChartLine, color: 'from-blue-500 to-cyan-500' },
                { id: 'crops', label: 'My Crops', icon: FaLeaf, color: 'from-green-500 to-emerald-500' },
                { id: 'livestock', label: 'Livestock', icon: GiCow, color: 'from-purple-500 to-pink-500' },
                { id: 'weather', label: 'Weather', icon: FaCloudRain, color: 'from-cyan-500 to-blue-500' },
                { id: 'activities', label: 'Activities', icon: FaCalendarAlt, color: 'from-orange-500 to-red-500' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-1 py-4 px-6 font-semibold text-sm flex items-center justify-center transition-all duration-300 ${
                    activeTab === tab.id 
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg` 
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                  style={{borderRadius: '2px'}}
                >
                  <tab.icon className="mr-3 text-lg" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {[
                    { label: 'Total Revenue', value: farmStats.totalRevenue, icon: FaMoneyBillWave, gradient: 'from-emerald-500 to-green-600', glow: 'emerald' },
                    { label: 'Total Costs', value: farmStats.totalCosts, icon: FaMoneyBillWave, gradient: 'from-red-500 to-pink-600', glow: 'red' },
                    { label: 'Net Profit', value: farmStats.netProfit, icon: FaChartLine, gradient: 'from-blue-500 to-cyan-600', glow: 'blue' },
                    { label: 'Yield/Acre', value: farmStats.yieldPerAcre, icon: FaTractor, gradient: 'from-amber-500 to-orange-600', glow: 'amber' },
                    { label: 'Active Crops', value: farmStats.activeCrops, icon: FaSeedling, gradient: 'from-green-500 to-emerald-600', glow: 'green' },
                    { label: 'Livestock', value: farmStats.livestock, icon: GiCow, gradient: 'from-purple-500 to-violet-600', glow: 'purple' }
                  ].map((metric, index) => (
                    <div key={index} className="group relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${metric.gradient} blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300`} style={{borderRadius: '2px'}}></div>
                      <div className="relative bg-white border border-gray-200 p-6 hover:border-gray-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105" style={{borderRadius: '2px'}}>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 bg-gradient-to-r ${metric.gradient} shadow-lg`} style={{borderRadius: '2px'}}>
                            <metric.icon className="text-white text-xl" />
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-800 mb-2">{metric.value}</div>
                        <div className="text-sm text-gray-600 font-medium">{metric.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white border border-gray-200 p-8 shadow-lg" style={{borderRadius: '2px'}}>
                  <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                    <div className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-blue-500 mr-4" style={{borderRadius: '2px'}}></div>
                    Quick Actions
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: 'Add New Crop', icon: FaPlus, gradient: 'from-green-500 to-emerald-600', action: () => setShowAddCropModal(true) },
                      { label: 'Record Expense', icon: FaMoneyBillWave, gradient: 'from-red-500 to-pink-600', action: () => setShowExpenseModal(true) },
                      { label: 'Update Livestock', icon: GiCow, gradient: 'from-blue-500 to-cyan-600', action: () => setShowLivestockModal(true) },
                      { label: 'View Analytics', icon: FaChartLine, gradient: 'from-purple-500 to-violet-600', action: () => setShowAnalyticsModal(true) }
                    ].map((action, index) => (
                      <button
                        key={index}
                        onClick={action.action}
                        className="group relative bg-gray-50 border border-gray-200 p-6 hover:bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300 text-center transform hover:scale-105"
                        style={{borderRadius: '2px'}}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} style={{borderRadius: '2px'}}></div>
                        <div className="relative">
                          <div className={`bg-gradient-to-r ${action.gradient} p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`} style={{borderRadius: '2px'}}>
                            <action.icon className="text-white text-2xl" />
                          </div>
                          <span className="text-gray-700 font-semibold group-hover:text-gray-800 transition-colors duration-300">{action.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Activities Preview */}
                <div className="bg-white border border-gray-200 p-8 shadow-lg" style={{borderRadius: '2px'}}>
                  <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 mr-4" style={{borderRadius: '2px'}}></div>
                    Recent Activities
                  </h3>
                  <div className="space-y-4">
                    {recentActivities.slice(0, 3).map(activity => (
                      <div key={activity.id} className="flex items-center p-4 bg-gray-50 border border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-md transition-all duration-300" style={{borderRadius: '2px'}}>
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-3 mr-4 shadow-sm" style={{borderRadius: '2px'}}>
                          <activity.icon className="text-gray-600 text-lg" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800">{activity.description}</div>
                          <div className="text-sm text-gray-500">{activity.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Crops Tab */}
            {activeTab === 'crops' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                    <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-emerald-500 mr-4" style={{borderRadius: '2px'}}></div>
                    My Crops
                  </h3>
                  <button 
                    onClick={() => setShowAddCropModal(true)}
                    className="relative group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/25 transform hover:scale-105"
                    style={{borderRadius: '2px'}}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{borderRadius: '2px'}}></div>
                    <div className="relative flex items-center">
                      <FaPlus className="mr-2" />
                      Add New Crop
                    </div>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {crops.map(crop => (
                    <div key={crop.id} className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{borderRadius: '2px'}}></div>
                      <div className="relative bg-white border border-gray-200 p-6 hover:border-gray-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105" style={{borderRadius: '2px'}}>
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="text-xl font-bold text-gray-800">{crop.name}</h4>
                          <span className={`px-3 py-1 text-xs font-semibold border ${
                            crop.status === 'Ready to Harvest' ? 'bg-green-50 text-green-700 border-green-200' :
                            crop.status === 'Growing' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }`} style={{borderRadius: '2px'}}>
                            {crop.status}
                          </span>
                        </div>
                        
                        <div className="space-y-3 text-sm mb-6">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Area:</span>
                            <span className="text-gray-700 font-medium">{crop.area}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Planted:</span>
                            <span className="text-gray-700 font-medium">{crop.plantingDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Expected Harvest:</span>
                            <span className="text-gray-700 font-medium">{crop.expectedHarvest}</span>
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="flex justify-between text-sm mb-3">
                            <span className="text-gray-500 font-medium">Progress</span>
                            <span className="text-gray-800 font-bold">{crop.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 h-3 overflow-hidden" style={{borderRadius: '2px'}}>
                            <div 
                              className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 transition-all duration-700 ease-out shadow-sm" 
                              style={{ width: `${crop.progress}%`, borderRadius: '2px' }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center text-sm font-semibold shadow-lg transform hover:scale-105" style={{borderRadius: '2px'}}>
                            <FaEdit className="mr-2" />
                            Update
                          </button>
                          <button 
                            onClick={() => sendCropUpdate(crop)}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center text-sm font-semibold shadow-lg transform hover:scale-105"
                            style={{borderRadius: '2px'}}
                          >
                            <FaSms className="mr-2" />
                            SMS Update
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Livestock Tab */}
            {activeTab === 'livestock' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">My Livestock</h3>
                  <button 
                    onClick={() => setShowLivestockModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center"
                  >
                    <FaPlus className="mr-2" />
                    Add Livestock
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 p-6" style={{borderRadius: '2px'}}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                        <GiCow className="mr-2 text-blue-500" />
                        Dairy Cows
                      </h4>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Healthy
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div>Count: 15 cows</div>
                      <div>Milk Production: 180L/day</div>
                      <div>Last Vaccination: 2024-12-12</div>
                      <div>Next Check: 2025-08-10</div>
                    </div>
                    <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition flex items-center justify-center text-sm">
                      <FaSms className="mr-1" />
                      SMS Report
                    </button>
                  </div>

                  <div className="bg-white border border-gray-200 p-6" style={{borderRadius: '2px'}}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                        <FaLeaf className="mr-2 text-yellow-500" />
                        Chickens
                      </h4>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Healthy
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div>Count: 50 chickens</div>
                      <div>Egg Production: 35 eggs/day</div>
                      <div>Last Vaccination: 2025-06-10</div>
                      <div>Next Check: 2025-08-10</div>
                    </div>
                    <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition flex items-center justify-center text-sm">
                      <FaSms className="mr-1" />
                      SMS Report
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Weather Tab */}
            {activeTab === 'weather' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 p-6" style={{borderRadius: '2px'}}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FaThermometerHalf className="mr-2 text-orange-500" />
                      Current Weather
                    </h3>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-800 mb-2">{weatherData.current.temp}</div>
                      <div className="text-gray-600 mb-2">{weatherData.current.condition}</div>
                      <div className="flex items-center justify-center text-sm text-gray-500">
                        <FaTint className="mr-1" />
                        Humidity: {weatherData.current.humidity}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 p-6" style={{borderRadius: '2px'}}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">3-Day Forecast</h3>
                    <div className="space-y-3">
                      {weatherData.forecast.map((day, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="font-medium">{day.day}</span>
                          <span className="text-gray-600">{day.condition}</span>
                          <span className="text-gray-800">{day.high}/{day.low}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activities Tab */}
            {activeTab === 'activities' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="bg-white border border-gray-200 p-4" style={{borderRadius: '2px'}} flex items-center>
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <activity.icon className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{activity.description}</div>
                        <div className="text-sm text-gray-500">{activity.date}</div>
                      </div>
                      <button className="text-orange-500 hover:text-orange-600">
                        <FaEye />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

        {/* Modals */}
        {/* Add New Crop Modal */}
        {showAddCropModal && (
          <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white border-2 border-orange-500 rounded-lg p-6 w-full max-w-md mx-4 shadow-lg animate-slideUp">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Add New Crop</h3>
                <button onClick={() => setShowAddCropModal(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
                  <input
                    type="text"
                    value={newCrop.name}
                    onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Maize"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area (acres)</label>
                  <input
                    type="number"
                    value={newCrop.area}
                    onChange={(e) => setNewCrop({...newCrop, area: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., 2.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planting Date</label>
                  <input
                    type="date"
                    value={newCrop.plantingDate}
                    onChange={(e) => setNewCrop({...newCrop, plantingDate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Harvest Date</label>
                  <input
                    type="date"
                    value={newCrop.expectedHarvest}
                    onChange={(e) => setNewCrop({...newCrop, expectedHarvest: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={addNewCrop}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Add Crop
                  </button>
                  <button
                    onClick={() => setShowAddCropModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Record Expense Modal */}
        {showExpenseModal && (
          <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white border-2 border-orange-500 rounded-lg p-6 w-full max-w-md mx-4 shadow-lg animate-slideUp">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Record Expense</h3>
                <button onClick={() => setShowExpenseModal(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Fertilizer purchase"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (NAIRA)</label>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 15000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="fertilizer">Fertilizer</option>
                    <option value="seeds">Seeds</option>
                    <option value="labor">Labor</option>
                    <option value="equipment">Equipment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={recordExpense}
                    className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                  >
                    Record Expense
                  </button>
                  <button
                    onClick={() => setShowExpenseModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Update Livestock Modal */}
        {showLivestockModal && (
          <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white border-2 border-orange-500 rounded-lg p-6 w-full max-w-md mx-4 shadow-lg animate-slideUp">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Update Livestock</h3>
                <button onClick={() => setShowLivestockModal(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Livestock Type</label>
                  <select
                    value={newLivestock.type}
                    onChange={(e) => setNewLivestock({...newLivestock, type: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Dairy Cows">Dairy Cows</option>
                    <option value="Chickens">Chickens</option>
                    <option value="Goats">Goats</option>
                    <option value="Sheep">Sheep</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
                  <input
                    type="number"
                    value={newLivestock.count}
                    onChange={(e) => setNewLivestock({...newLivestock, count: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
                  <select
                    value={newLivestock.healthStatus}
                    onChange={(e) => setNewLivestock({...newLivestock, healthStatus: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Healthy">Healthy</option>
                    <option value="Under Treatment">Under Treatment</option>
                    <option value="Needs Attention">Needs Attention</option>
                  </select>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={updateLivestock}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Update Livestock
                  </button>
                  <button
                    onClick={() => setShowLivestockModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Analytics Modal */}
        {showAnalyticsModal && (
          <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white border-2 border-orange-500 rounded-lg p-6 w-full max-w-2xl mx-4 shadow-lg animate-slideUp">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Farm Analytics Overview</h3>
                <button onClick={() => setShowAnalyticsModal(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 p-4" style={{borderRadius: '2px'}}>
                    <h4 className="font-semibold text-green-800 mb-2">Revenue Trend</h4>
                    <div className="text-2xl font-bold text-green-600">+18.4%</div>
                    <p className="text-sm text-green-700">Compared to last period</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-4" style={{borderRadius: '2px'}}>
                    <h4 className="font-semibold text-blue-800 mb-2">Yield Performance</h4>
                    <div className="text-2xl font-bold text-blue-600">2.5 tons/acre</div>
                    <p className="text-sm text-blue-700">Above average yield</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4" style={{borderRadius: '2px'}}>
                  <h4 className="font-semibold text-gray-800 mb-3">Top Performing Crops</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Maize</span>
                      <span className="text-green-600 font-medium">+15% yield</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Beans</span>
                      <span className="text-green-600 font-medium">+8% yield</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Potatoes</span>
                      <span className="text-green-600 font-medium">+22% yield</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => {
                      setShowAnalyticsModal(false)
                      // Navigate to full analytics page
                      window.location.href = '/analytics'
                    }}
                    className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
                  >
                    View Full Analytics
                  </button>
                  <button
                    onClick={() => setShowAnalyticsModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  
  )
}

export default FarmerDashboard
