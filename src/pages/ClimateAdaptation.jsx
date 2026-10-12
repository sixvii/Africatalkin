import { useState } from 'react'
import { FaCloudRain, FaThermometerHalf, FaWind, FaSeedling, FaSms, FaExclamationTriangle, FaShieldAlt, FaChartLine, FaCalendarAlt } from 'react-icons/fa'
import { sendSMS } from '../utils/smsAPI'

function ClimateAdaptation() {
  const [activeTab, setActiveTab] = useState('strategies')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState('sahel')

  const adaptationStrategies = [
    {
      id: 1,
      title: "Drought-Resistant Crops",
      icon: FaSeedling,
      description: "Crops that survive with minimal water",
      crops: ["Sorghum", "Millet", "Cassava", "Sweet Potato"],
      implementation: "Replace 30% of traditional crops with drought-resistant varieties",
      timeline: "1-2 seasons",
      effectiveness: "Reduces crop loss by 70% during droughts"
    },
    {
      id: 2,
      title: "Water Harvesting",
      icon: FaCloudRain,
      description: "Collecting and storing rainwater",
      methods: ["Roof catchment", "Surface runoff", "Underground tanks"],
      implementation: "Install collection systems before rainy season",
      timeline: "2-3 months",
      effectiveness: "Provides water for 6 months dry period"
    },
    {
      id: 3,
      title: "Soil Conservation",
      icon: FaShieldAlt,
      description: "Protecting soil from erosion and degradation",
      techniques: ["Terracing", "Cover crops", "Agroforestry", "Contour farming"],
      implementation: "Start with cover crops, gradually add other techniques",
      timeline: "1-3 years",
      effectiveness: "Prevents 80% soil erosion"
    }
  ]

  const climateRisks = {
    sahel: {
      risks: ["Severe drought", "Desertification", "Irregular rainfall"],
      temperature: "+2.5°C by 2050",
      rainfall: "-20% reduction",
      priority: "Water conservation"
    },
    coastal: {
      risks: ["Sea level rise", "Flooding", "Saltwater intrusion"],
      temperature: "+1.8°C by 2050",
      rainfall: "+15% increase",
      priority: "Flood management"
    },
    highland: {
      risks: ["Temperature rise", "Changing seasons", "Pest migration"],
      temperature: "+2.0°C by 2050",
      rainfall: "Variable patterns",
      priority: "Crop diversification"
    }
  }

  const earlyWarning = [
    { type: "Drought Alert", severity: "High", region: "Northern Nigeria", action: "Implement water conservation" },
    { type: "Flood Warning", severity: "Medium", region: "River Niger Basin", action: "Prepare drainage systems" },
    { type: "Heat Wave", severity: "Low", region: "Central Nigeria", action: "Adjust planting schedule" }
  ]

  const sendAdaptationGuide = async (strategy) => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }
    
    setLoading(true)
    const message = `CLIMATE ADAPTATION: ${strategy.title} - ${strategy.description}. Implementation: ${strategy.implementation}. Timeline: ${strategy.timeline}. Effectiveness: ${strategy.effectiveness}`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Climate adaptation guide sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  const sendClimateAlert = async (alert) => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }
    
    setLoading(true)
    const message = `CLIMATE ALERT: ${alert.type} - Severity: ${alert.severity} in ${alert.region}. Recommended Action: ${alert.action}. Take immediate steps to protect your farm!`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Climate alert sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-blue-50 py-4 sm:py-6 lg:py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Climate Adaptation</h1>
          <p className="text-sm sm:text-base text-gray-600 px-2">Building resilience against climate change</p>
        </div>

        {/* Phone Input */}
        <div className="bg-white shadow-lg p-4 sm:p-6 mb-6" style={{borderRadius: '2px'}}>
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number for Climate Alerts</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+234 XXX XXX XXXX"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{borderRadius: '2px'}}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-6 bg-white shadow-lg p-2" style={{borderRadius: '2px'}}>
          {[
            { key: 'strategies', label: 'Strategies', icon: FaShieldAlt },
            { key: 'risks', label: 'Climate Risks', icon: FaExclamationTriangle },
            { key: 'alerts', label: 'Early Warning', icon: FaCloudRain }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center px-4 py-2 mx-1 mb-2 transition ${
                activeTab === tab.key 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
              }`}
              style={{borderRadius: '2px'}}
            >
              <tab.icon className="mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Adaptation Strategies */}
        {activeTab === 'strategies' && (
          <div className="space-y-6">
            {adaptationStrategies.map(strategy => (
              <div key={strategy.id} className="bg-white shadow-lg p-6" style={{borderRadius: '2px'}}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <strategy.icon className="text-3xl text-blue-500 mr-4" />
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{strategy.title}</h3>
                      <p className="text-gray-600">{strategy.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Implementation:</h4>
                    <p className="text-sm text-gray-600">{strategy.implementation}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Timeline:</h4>
                    <p className="text-sm text-gray-600">{strategy.timeline}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Effectiveness:</h4>
                  <p className="text-sm text-green-600 font-medium">{strategy.effectiveness}</p>
                </div>
                
                <button
                  onClick={() => sendAdaptationGuide(strategy)}
                  disabled={loading}
                  className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 transition flex items-center"
                  style={{borderRadius: '2px'}}
                >
                  <FaSms className="mr-2" />
                  {loading ? 'Sending...' : 'Get SMS Guide'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Climate Risks */}
        {activeTab === 'risks' && (
          <div className="space-y-6">
            <div className="bg-white shadow-lg p-4" style={{borderRadius: '2px'}}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Region:</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{borderRadius: '2px'}}
              >
                <option value="sahel">Sahel Region</option>
                <option value="coastal">Coastal Region</option>
                <option value="highland">Highland Region</option>
              </select>
            </div>
            
            <div className="bg-white shadow-lg p-6" style={{borderRadius: '2px'}}>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Climate Projections for {selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)} Region</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Major Risks:</h4>
                  <ul className="space-y-1">
                    {climateRisks[selectedRegion].risks.map((risk, index) => (
                      <li key={index} className="flex items-center text-red-600">
                        <FaExclamationTriangle className="mr-2" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Projections by 2050:</h4>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <FaThermometerHalf className="mr-2 text-red-500" />
                      Temperature: {climateRisks[selectedRegion].temperature}
                    </p>
                    <p className="flex items-center">
                      <FaCloudRain className="mr-2 text-blue-500" />
                      Rainfall: {climateRisks[selectedRegion].rainfall}
                    </p>
                    <p className="flex items-center">
                      <FaShieldAlt className="mr-2 text-green-500" />
                      Priority: {climateRisks[selectedRegion].priority}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Early Warning */}
        {activeTab === 'alerts' && (
          <div className="space-y-4">
            {earlyWarning.map((alert, index) => (
              <div key={index} className="bg-white shadow-lg p-6 flex items-center justify-between" style={{borderRadius: '2px'}}>
                <div className="flex items-center">
                  <FaExclamationTriangle className={`text-2xl mr-4 ${
                    alert.severity === 'High' ? 'text-red-500' : 
                    alert.severity === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                  }`} />
                  <div>
                    <h3 className="font-bold text-gray-800">{alert.type}</h3>
                    <p className="text-gray-600">{alert.region}</p>
                    <p className="text-sm text-gray-500">Action: {alert.action}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 text-sm font-medium ${
                    alert.severity === 'High' ? 'bg-red-100 text-red-800' : 
                    alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`} style={{borderRadius: '2px'}}>
                    {alert.severity}
                  </span>
                  
                  <button
                    onClick={() => sendClimateAlert(alert)}
                    disabled={loading}
                    className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 transition flex items-center"
                    style={{borderRadius: '2px'}}
                  >
                    <FaSms className="mr-2" />
                    Send Alert
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ClimateAdaptation
