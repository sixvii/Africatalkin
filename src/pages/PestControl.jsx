import { useState } from 'react'
import { FaBug, FaLeaf, FaExclamationTriangle, FaSms, FaCamera, FaSearch, FaShieldAlt, FaCalendarAlt, FaMapMarkerAlt, FaThermometerHalf } from 'react-icons/fa'
import { sendSMS } from '../utils/smsAPI'

function PestControl() {
  const [activeTab, setActiveTab] = useState('identify')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedPest, setSelectedPest] = useState(null)
  const [selectedCrop, setSelectedCrop] = useState('maize')
  const [loading, setLoading] = useState(false)

  const commonPests = [
    {
      id: 1,
      name: 'Fall Armyworm',
      scientificName: 'Spodoptera frugiperda',
      crops: ['Maize', 'Sorghum', 'Rice'],
      severity: 'High',
      description: 'Destructive caterpillar that feeds on leaves and stems',
      symptoms: ['Holes in leaves', 'Frass (droppings)', 'Damaged growing points'],
      treatment: 'Apply Bt-based insecticides, use pheromone traps',
      prevention: 'Early planting, crop rotation, biological control',
      image: '🐛',
      season: 'Rainy season'
    },
    {
      id: 2,
      name: 'Aphids',
      scientificName: 'Aphis spp.',
      crops: ['Beans', 'Vegetables', 'Fruits'],
      severity: 'Medium',
      description: 'Small sucking insects that weaken plants',
      symptoms: ['Curled leaves', 'Sticky honeydew', 'Yellowing'],
      treatment: 'Neem oil spray, insecticidal soap',
      prevention: 'Encourage beneficial insects, reflective mulch',
      image: '🦗',
      season: 'All year'
    },
    {
      id: 3,
      name: 'Whiteflies',
      scientificName: 'Bemisia tabaci',
      crops: ['Tomatoes', 'Beans', 'Cotton'],
      severity: 'High',
      description: 'Tiny white flying insects that transmit viruses',
      symptoms: ['Yellow sticky traps catch adults', 'Sooty mold', 'Stunted growth'],
      treatment: 'Yellow sticky traps, neem oil',
      prevention: 'Remove weeds, use resistant varieties',
      image: '🦟',
      season: 'Dry season'
    },
    {
      id: 4,
      name: 'Cutworms',
      scientificName: 'Agrotis spp.',
      crops: ['Vegetables', 'Maize', 'Beans'],
      severity: 'Medium',
      description: 'Caterpillars that cut young plants at soil level',
      symptoms: ['Cut stems', 'Missing seedlings', 'Wilted plants'],
      treatment: 'Collar barriers, Bt spray, hand picking',
      prevention: 'Clean cultivation, avoid fresh manure',
      image: '🐛',
      season: 'Early rainy season'
    }
  ]

  const pestAlerts = [
    {
      id: 1,
      pest: 'Fall Armyworm',
      location: 'Nakuru County',
      severity: 'High',
      date: '2024-01-15',
      crops: ['Maize'],
      action: 'Immediate treatment required'
    },
    {
      id: 2,
      pest: 'Aphids',
      location: 'Kiambu County',
      severity: 'Medium',
      date: '2024-01-14',
      crops: ['Beans', 'Vegetables'],
      action: 'Monitor and treat if necessary'
    }
  ]

  const treatmentSchedule = [
    {
      id: 1,
      crop: 'Maize',
      pest: 'Fall Armyworm',
      treatment: 'Bt spray application',
      date: '2024-01-16',
      status: 'Pending'
    },
    {
      id: 2,
      crop: 'Beans',
      pest: 'Aphids',
      treatment: 'Neem oil spray',
      date: '2024-01-17',
      status: 'Scheduled'
    }
  ]

  const sendPestAlert = async (pest) => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }
    
    setLoading(true)
    const smsMessage = `PEST ALERT: ${pest.name} detected! Affects: ${pest.crops.join(', ')}. Symptoms: ${pest.symptoms[0]}. Treatment: ${pest.treatment}. Act fast to protect your crops!`
    
    try {
      await sendSMS([phoneNumber], smsMessage)
      alert('Pest alert sent to your phone!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  const sendTreatmentReminder = async (treatment) => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }
    
    setLoading(true)
    const smsMessage = `TREATMENT REMINDER: Apply ${treatment.treatment} for ${treatment.pest} on ${treatment.crop} scheduled for ${treatment.date}. Don't delay - protect your harvest!`
    
    try {
      await sendSMS([phoneNumber], smsMessage)
      alert('Treatment reminder sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Pest Control Center</h1>
          <p className="text-gray-600">Identify, monitor, and control agricultural pests with SMS alerts</p>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow-lg shadow-red-500/20 p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+254700000000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Crop</label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="maize">Maize</option>
                <option value="beans">Beans</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg shadow-red-500/20 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'identify', label: 'Pest Identification', icon: FaSearch },
                { id: 'alerts', label: 'Pest Alerts', icon: FaExclamationTriangle },
                { id: 'treatment', label: 'Treatment Schedule', icon: FaCalendarAlt },
                { id: 'prevention', label: 'Prevention Tips', icon: FaShieldAlt }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id 
                      ? 'border-red-500 text-red-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Pest Identification Tab */}
            {activeTab === 'identify' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">Common Agricultural Pests</h3>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center">
                    <FaCamera className="mr-2" />
                    Upload Photo
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {commonPests.map(pest => (
                    <div key={pest.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="text-4xl mr-4">{pest.image}</div>
                          <div>
                            <h4 className="font-medium text-gray-800">{pest.name}</h4>
                            <p className="text-sm text-gray-500 italic">{pest.scientificName}</p>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getSeverityColor(pest.severity)}`}>
                              {pest.severity} Risk
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-gray-700 text-sm">Affected Crops:</h5>
                          <p className="text-gray-600 text-sm">{pest.crops.join(', ')}</p>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-700 text-sm">Symptoms:</h5>
                          <ul className="text-gray-600 text-sm">
                            {pest.symptoms.map((symptom, index) => (
                              <li key={index}>• {symptom}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-700 text-sm">Treatment:</h5>
                          <p className="text-gray-600 text-sm">{pest.treatment}</p>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <button
                            onClick={() => sendPestAlert(pest)}
                            disabled={loading || !phoneNumber}
                            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50 flex items-center justify-center text-sm"
                          >
                            <FaSms className="mr-1" />
                            SMS Alert
                          </button>
                          <button
                            onClick={() => setSelectedPest(pest)}
                            className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition text-sm"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pest Alerts Tab */}
            {activeTab === 'alerts' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Current Pest Alerts</h3>
                
                <div className="space-y-4">
                  {pestAlerts.map(alert => (
                    <div key={alert.id} className="border border-red-200 bg-red-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <FaExclamationTriangle className="text-red-500 mr-2" />
                            <h4 className="font-medium text-red-800">{alert.pest} Alert</h4>
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getSeverityColor(alert.severity)}`}>
                              {alert.severity}
                            </span>
                          </div>
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-red-700">Location:</span>
                              <p className="text-red-600">{alert.location}</p>
                            </div>
                            <div>
                              <span className="font-medium text-red-700">Affected Crops:</span>
                              <p className="text-red-600">{alert.crops.join(', ')}</p>
                            </div>
                            <div>
                              <span className="font-medium text-red-700">Date:</span>
                              <p className="text-red-600">{alert.date}</p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="font-medium text-red-700">Recommended Action:</span>
                            <p className="text-red-600 text-sm">{alert.action}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => sendPestAlert(commonPests.find(p => p.name === alert.pest))}
                          disabled={loading || !phoneNumber}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50 flex items-center ml-4"
                        >
                          <FaSms className="mr-2" />
                          SMS Alert
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">🔔 Alert Subscription</h4>
                  <p className="text-yellow-700 text-sm mb-3">Get notified about pest outbreaks in your area</p>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                    Subscribe to Alerts
                  </button>
                </div>
              </div>
            )}

            {/* Treatment Schedule Tab */}
            {activeTab === 'treatment' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">Treatment Schedule</h3>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    Add Treatment
                  </button>
                </div>

                <div className="space-y-4">
                  {treatmentSchedule.map(treatment => (
                    <div key={treatment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <FaBug className="text-red-500 mr-2" />
                            <h4 className="font-medium text-gray-800">{treatment.treatment}</h4>
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                              treatment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {treatment.status}
                            </span>
                          </div>
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Crop:</span>
                              <p className="text-gray-600">{treatment.crop}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Target Pest:</span>
                              <p className="text-gray-600">{treatment.pest}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Scheduled Date:</span>
                              <p className="text-gray-600">{treatment.date}</p>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => sendTreatmentReminder(treatment)}
                          disabled={loading || !phoneNumber}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 flex items-center ml-4"
                        >
                          <FaSms className="mr-2" />
                          SMS Reminder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prevention Tips Tab */}
            {activeTab === 'prevention' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Integrated Pest Management (IPM)</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-medium text-green-800 mb-4 flex items-center">
                      <FaShieldAlt className="mr-2" />
                      Cultural Control
                    </h4>
                    <ul className="space-y-2 text-green-700 text-sm">
                      <li>• Crop rotation to break pest cycles</li>
                      <li>• Early planting to avoid peak pest seasons</li>
                      <li>• Proper field sanitation</li>
                      <li>• Use of resistant varieties</li>
                      <li>• Intercropping with repellent plants</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-medium text-blue-800 mb-4 flex items-center">
                      <FaLeaf className="mr-2" />
                      Biological Control
                    </h4>
                    <ul className="space-y-2 text-blue-700 text-sm">
                      <li>• Encourage beneficial insects</li>
                      <li>• Use of parasitoids and predators</li>
                      <li>• Bt-based biopesticides</li>
                      <li>• Pheromone traps for monitoring</li>
                      <li>• Neem-based organic treatments</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h4 className="font-medium text-yellow-800 mb-4 flex items-center">
                      <FaThermometerHalf className="mr-2" />
                      Environmental Monitoring
                    </h4>
                    <ul className="space-y-2 text-yellow-700 text-sm">
                      <li>• Regular field scouting</li>
                      <li>• Weather-based pest forecasting</li>
                      <li>• Economic threshold monitoring</li>
                      <li>• Seasonal pest calendar tracking</li>
                      <li>• Community reporting systems</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h4 className="font-medium text-purple-800 mb-4 flex items-center">
                      <FaBug className="mr-2" />
                      Chemical Control
                    </h4>
                    <ul className="space-y-2 text-purple-700 text-sm">
                      <li>• Use pesticides as last resort</li>
                      <li>• Rotate active ingredients</li>
                      <li>• Follow label instructions strictly</li>
                      <li>• Target specific pest life stages</li>
                      <li>• Minimize impact on beneficials</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-800 mb-4">Monthly Pest Management Calendar</h4>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-sm">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => (
                      <div key={month} className="text-center">
                        <h5 className="font-medium text-gray-700 mb-2">{month}</h5>
                        <p className="text-gray-600 text-xs">Field prep & monitoring</p>
                      </div>
                    ))}
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

export default PestControl