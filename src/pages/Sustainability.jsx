import { useState } from 'react'
import { FaLeaf, FaRecycle, FaWater, FaSeedling, FaSms, FaGlobe, FaShieldAlt, FaChartLine, FaUsers, FaLightbulb } from 'react-icons/fa'
import { sendSMS } from '../utils/smsAPI'

function Sustainability() {
  const [activeTab, setActiveTab] = useState('practices')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)

  const sustainablePractices = [
    {
      id: 1,
      title: "Organic Farming",
      icon: FaLeaf,
      description: "Chemical-free farming methods",
      benefits: ["Healthier soil", "Better crop quality", "Higher market prices"],
      implementation: "Start with compost, use natural pesticides, rotate crops",
      cost: "Low initial cost",
      impact: "Reduces soil degradation by 60%"
    },
    {
      id: 2,
      title: "Water Conservation",
      icon: FaWater,
      description: "Efficient water usage techniques",
      benefits: ["Reduced water bills", "Drought resistance", "Better yields"],
      implementation: "Drip irrigation, rainwater harvesting, mulching",
      cost: "Medium investment",
      impact: "Saves up to 40% water usage"
    },
    {
      id: 3,
      title: "Crop Rotation",
      icon: FaSeedling,
      description: "Rotating different crops seasonally",
      benefits: ["Improved soil health", "Pest control", "Higher yields"],
      implementation: "Plan 3-4 crop rotation cycle, include legumes",
      cost: "No additional cost",
      impact: "Increases soil fertility by 30%"
    },
    {
      id: 4,
      title: "Composting",
      icon: FaRecycle,
      description: "Converting waste to organic fertilizer",
      benefits: ["Free fertilizer", "Waste reduction", "Soil improvement"],
      implementation: "Collect organic waste, create compost bins, turn regularly",
      cost: "Very low cost",
      impact: "Reduces fertilizer costs by 50%"
    }
  ]

  const certifications = [
    { name: "Organic Certification", requirements: "3 years chemical-free farming", benefits: "30% price premium" },
    { name: "Fair Trade", requirements: "Social and environmental standards", benefits: "Guaranteed minimum price" },
    { name: "Rainforest Alliance", requirements: "Biodiversity conservation", benefits: "Market access to premium buyers" }
  ]

  const sendPracticeGuide = async (practice) => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }
    
    setLoading(true)
    const message = `SUSTAINABILITY GUIDE: ${practice.title} - ${practice.description}. Implementation: ${practice.implementation}. Impact: ${practice.impact}. Benefits: ${practice.benefits.join(', ')}`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Sustainability guide sent to your phone!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-green-50 py-4 sm:py-6 lg:py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Sustainability Hub</h1>
          <p className="text-sm sm:text-base text-gray-600 px-2">Eco-friendly farming practices for a better future</p>
        </div>

        {/* Phone Input */}
        <div className="bg-white shadow-lg p-4 sm:p-6 mb-6" style={{borderRadius: '2px'}}>
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number for SMS Guides</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+234 XXX XXX XXXX"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{borderRadius: '2px'}}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-6 bg-white shadow-lg p-2" style={{borderRadius: '2px'}}>
          {[
            { key: 'practices', label: 'Practices', icon: FaLeaf },
            { key: 'certifications', label: 'Certifications', icon: FaShieldAlt },
            { key: 'impact', label: 'Impact', icon: FaChartLine }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center px-4 py-2 mx-1 mb-2 transition ${
                activeTab === tab.key 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100'
              }`}
              style={{borderRadius: '2px'}}
            >
              <tab.icon className="mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sustainable Practices */}
        {activeTab === 'practices' && (
          <div className="grid md:grid-cols-2 gap-6">
            {sustainablePractices.map(practice => (
              <div key={practice.id} className="bg-white shadow-lg p-6" style={{borderRadius: '2px'}}>
                <div className="flex items-center mb-4">
                  <practice.icon className="text-3xl text-green-500 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{practice.title}</h3>
                    <p className="text-gray-600">{practice.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700">Benefits:</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {practice.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700">Implementation:</h4>
                    <p className="text-sm text-gray-600">{practice.implementation}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-600">{practice.cost}</span>
                    <span className="text-sm text-blue-600">{practice.impact}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => sendPracticeGuide(practice)}
                  disabled={loading}
                  className="w-full mt-4 bg-green-500 text-white py-2 px-4 hover:bg-green-600 transition flex items-center justify-center"
                  style={{borderRadius: '2px'}}
                >
                  <FaSms className="mr-2" />
                  {loading ? 'Sending...' : 'Send Guide via SMS'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {activeTab === 'certifications' && (
          <div className="space-y-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white shadow-lg p-6" style={{borderRadius: '2px'}}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{cert.name}</h3>
                    <p className="text-gray-600">Requirements: {cert.requirements}</p>
                    <p className="text-green-600 font-medium">Benefits: {cert.benefits}</p>
                  </div>
                  <FaShieldAlt className="text-3xl text-green-500" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Impact Metrics */}
        {activeTab === 'impact' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg p-6 text-center" style={{borderRadius: '2px'}}>
              <FaGlobe className="text-4xl text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">60%</h3>
              <p className="text-gray-600">Reduction in Carbon Footprint</p>
            </div>
            <div className="bg-white shadow-lg p-6 text-center" style={{borderRadius: '2px'}}>
              <FaWater className="text-4xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">40%</h3>
              <p className="text-gray-600">Water Conservation</p>
            </div>
            <div className="bg-white shadow-lg p-6 text-center" style={{borderRadius: '2px'}}>
              <FaSeedling className="text-4xl text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">30%</h3>
              <p className="text-gray-600">Increase in Soil Health</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sustainability
