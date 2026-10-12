import { useState } from 'react'
import { FaHeart, FaSyringe, FaCalendarAlt, FaSms, FaChartLine, FaThermometerHalf, FaWeight } from 'react-icons/fa'
import { GiCow } from 'react-icons/gi'
import { sendSMS } from '../utils/smsAPI'

function Livestock() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedAnimal, setSelectedAnimal] = useState('')

  const livestockInventory = [
    {
      id: 1,
      type: 'Dairy Cattle',
      count: 25,
      breeds: ['Holstein', 'Friesian'],
      avgWeight: '450kg',
      milkProduction: '20L/day/cow',
      healthStatus: 'Good',
      lastVaccination: '2024-01-15',
      nextVaccination: '2024-07-15'
    },
    {
      id: 2,
      type: 'Goats',
      count: 40,
      breeds: ['Boer', 'Saanen'],
      avgWeight: '35kg',
      milkProduction: '2L/day/goat',
      healthStatus: 'Excellent',
      lastVaccination: '2024-02-10',
      nextVaccination: '2024-08-10'
    },
    {
      id: 3,
      type: 'Poultry',
      count: 200,
      breeds: ['Rhode Island Red', 'Leghorn'],
      avgWeight: '2kg',
      eggProduction: '180 eggs/day',
      healthStatus: 'Good',
      lastVaccination: '2024-03-01',
      nextVaccination: '2024-06-01'
    }
  ]

  const healthRecords = [
    { animal: 'Cow #001', type: 'Dairy Cattle', issue: 'Mastitis', treatment: 'Antibiotics', date: '2024-02-15', status: 'Recovered' },
    { animal: 'Goat #015', type: 'Goat', issue: 'Worm infestation', treatment: 'Deworming', date: '2024-02-20', status: 'Treated' },
    { animal: 'Chicken Flock A', type: 'Poultry', issue: 'Newcastle Disease', treatment: 'Vaccination', date: '2024-03-01', status: 'Prevented' }
  ]

  const breedingSchedule = [
    { animal: 'Cow #003', type: 'Dairy Cattle', lastBreeding: '2024-01-20', expectedCalving: '2024-10-20', status: 'Pregnant' },
    { animal: 'Goat #008', type: 'Goat', lastBreeding: '2024-03-15', expectedKidding: '2024-08-15', status: 'Pregnant' },
    { animal: 'Cow #007', type: 'Dairy Cattle', breedingDue: '2024-04-10', status: 'Ready for breeding' }
  ]

  const feedingSchedule = [
    { type: 'Dairy Cattle', feed: 'Hay + Concentrates', amount: '25kg/day', cost: 'KES 800/day', schedule: '3 times daily' },
    { type: 'Goats', feed: 'Pasture + Supplements', amount: '2kg/day', cost: 'KES 50/day', schedule: '2 times daily' },
    { type: 'Poultry', feed: 'Layer Mash', amount: '120g/bird', cost: 'KES 600/day', schedule: '3 times daily' }
  ]

  const productionMetrics = {
    milk: { daily: '520L', monthly: '15,600L', revenue: 'KES 780,000/month' },
    eggs: { daily: '180 eggs', monthly: '5,400 eggs', revenue: 'KES 81,000/month' },
    meat: { monthly: '150kg', revenue: 'KES 75,000/month' }
  }

  const sendLivestockReport = async (livestock) => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    const message = `LIVESTOCK REPORT: ${livestock.type} - Count: ${livestock.count}, Health: ${livestock.healthStatus}, Production: ${livestock.milkProduction || livestock.eggProduction}, Next Vaccination: ${livestock.nextVaccination}`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Livestock report sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  const sendHealthAlert = async (record) => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    const message = `HEALTH ALERT: ${record.animal} (${record.type}) - Issue: ${record.issue}, Treatment: ${record.treatment}, Status: ${record.status}, Date: ${record.date}`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Health alert sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  const sendBreedingReminder = async (breeding) => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    const message = `BREEDING REMINDER: ${breeding.animal} - ${breeding.status}. ${breeding.expectedCalving ? `Expected calving: ${breeding.expectedCalving}` : breeding.expectedKidding ? `Expected kidding: ${breeding.expectedKidding}` : `Breeding due: ${breeding.breedingDue}`}`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Breeding reminder sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  const sendFeedingSchedule = async (feeding) => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    const message = `FEEDING SCHEDULE: ${feeding.type} - Feed: ${feeding.feed}, Amount: ${feeding.amount}, Cost: ${feeding.cost}, Schedule: ${feeding.schedule}`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Feeding schedule sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">Livestock Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Comprehensive livestock tracking and management system</p>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow-lg shadow-orange-500/20 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+254700000000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg shadow-orange-500/20">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto px-2 sm:px-6 scrollbar-hide">
              {[
                { id: 'overview', label: 'Overview', icon: GiCow },
                { id: 'health', label: 'Health', icon: FaThermometerHalf },
                { id: 'breeding', label: 'Breeding', icon: FaHeart },
                { id: 'feeding', label: 'Feeding', icon: FaWeight },
                { id: 'production', label: 'Production', icon: FaChartLine }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 sm:py-4 px-2 sm:px-4 border-b-2 font-medium text-xs sm:text-sm flex items-center whitespace-nowrap min-w-max ${
                    activeTab === tab.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500'
                  }`}
                >
                  <tab.icon className="mr-1 sm:mr-2 text-sm sm:text-base" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.slice(0, 4)}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-3 sm:p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-4 sm:space-y-6">
                {livestockInventory.map(livestock => (
                  <div key={livestock.id} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover-lift animate-slideUp">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2 text-lg sm:text-xl">{livestock.type}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-1 sm:gap-2 text-sm sm:text-base">
                          <p className="text-gray-600">Count: {livestock.count}</p>
                          <p className="text-gray-600">Breeds: {livestock.breeds.join(', ')}</p>
                          <p className="text-gray-600">Avg Weight: {livestock.avgWeight}</p>
                          <p className="text-gray-600">Production: {livestock.milkProduction || livestock.eggProduction}</p>
                        </div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 transition-all duration-200 ${
                          livestock.healthStatus === 'Excellent' ? 'bg-green-100 text-green-600' : 
                          livestock.healthStatus === 'Good' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {livestock.healthStatus}
                        </span>
                      </div>
                      <button
                        onClick={() => sendLivestockReport(livestock)}
                        className="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                      >
                        <FaSms className="inline mr-1 transition-transform duration-200" /> 
                        <span className="hidden sm:inline">Send Report</span>
                        <span className="sm:hidden">Send</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Health Records Tab */}
            {activeTab === 'health' && (
              <div className="space-y-4">
                {healthRecords.map((record, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover-lift animate-slideUp">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2 text-lg sm:text-xl">{record.animal}</h3>
                        <div className="grid grid-cols-1 gap-1 sm:gap-2 text-sm sm:text-base">
                          <p className="text-gray-600">Type: {record.type}</p>
                          <p className="text-gray-600">Issue: {record.issue}</p>
                          <p className="text-gray-600">Treatment: {record.treatment}</p>
                          <p className="text-gray-600">Date: {record.date}</p>
                        </div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 transition-all duration-200 ${
                          record.status === 'Recovered' ? 'bg-green-100 text-green-600' : 
                          record.status === 'Treated' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {record.status}
                        </span>
                      </div>
                      <button
                        onClick={() => sendHealthAlert(record)}
                        className="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                      >
                        <FaSms className="inline mr-1 transition-transform duration-200" /> 
                        <span className="hidden sm:inline">Send Alert</span>
                        <span className="sm:hidden">Alert</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Breeding Tab */}
            {activeTab === 'breeding' && (
              <div className="space-y-4">
                {breedingSchedule.map((breeding, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover-lift animate-slideUp">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2 text-lg sm:text-xl">{breeding.animal}</h3>
                        <div className="grid grid-cols-1 gap-1 sm:gap-2 text-sm sm:text-base">
                          <p className="text-gray-600">Type: {breeding.type}</p>
                          {breeding.lastBreeding && <p className="text-gray-600">Last Breeding: {breeding.lastBreeding}</p>}
                          {breeding.expectedCalving && <p className="text-gray-600">Expected Calving: {breeding.expectedCalving}</p>}
                          {breeding.expectedKidding && <p className="text-gray-600">Expected Kidding: {breeding.expectedKidding}</p>}
                          {breeding.breedingDue && <p className="text-gray-600">Breeding Due: {breeding.breedingDue}</p>}
                        </div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 transition-all duration-200 ${
                          breeding.status === 'Pregnant' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {breeding.status}
                        </span>
                      </div>
                      <button
                        onClick={() => sendBreedingReminder(breeding)}
                        className="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                      >
                        <FaSms className="inline mr-1 transition-transform duration-200" /> 
                        <span className="hidden sm:inline">Send Reminder</span>
                        <span className="sm:hidden">Remind</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Feeding Tab */}
            {activeTab === 'feeding' && (
              <div className="space-y-4">
                {feedingSchedule.map((feeding, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover-lift animate-slideUp">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2 text-lg sm:text-xl">{feeding.type}</h3>
                        <div className="grid grid-cols-1 gap-1 sm:gap-2 text-sm sm:text-base">
                          <p className="text-gray-600">Feed Type: {feeding.feed}</p>
                          <p className="text-gray-600">Amount: {feeding.amount}</p>
                          <p className="text-gray-600">Daily Cost: {feeding.cost}</p>
                          <p className="text-gray-600">Schedule: {feeding.schedule}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => sendFeedingSchedule(feeding)}
                        className="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                      >
                        <FaSms className="inline mr-1 transition-transform duration-200" /> 
                        <span className="hidden sm:inline">Send Schedule</span>
                        <span className="sm:hidden">Schedule</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Production Tab */}
            {activeTab === 'production' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover-lift animate-slideUp">
                  <div className="flex items-center mb-4">
                    <FaWeight className="text-blue-500 text-xl mr-3" />
                    <h3 className="text-lg font-semibold text-gray-800">Milk Production</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Daily:</span> {productionMetrics.milk.daily}</div>
                    <div><span className="font-medium">Monthly:</span> {productionMetrics.milk.monthly}</div>
                    <div><span className="font-medium">Revenue:</span> {productionMetrics.milk.revenue}</div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover-lift animate-slideUp">
                  <div className="flex items-center mb-4">
                    <FaCalendarAlt className="text-yellow-500 text-xl mr-3" />
                    <h3 className="text-lg font-semibold text-gray-800">Egg Production</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Daily:</span> {productionMetrics.eggs.daily}</div>
                    <div><span className="font-medium">Monthly:</span> {productionMetrics.eggs.monthly}</div>
                    <div><span className="font-medium">Revenue:</span> {productionMetrics.eggs.revenue}</div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover-lift animate-slideUp sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center mb-4">
                    <GiCow className="text-red-500 text-xl mr-3" />
                    <h3 className="text-lg font-semibold text-gray-800">Meat Production</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Monthly:</span> {productionMetrics.meat.monthly}</div>
                    <div><span className="font-medium">Revenue:</span> {productionMetrics.meat.revenue}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Livestock
