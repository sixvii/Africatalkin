import { useState } from 'react'
import { FaGlobe, FaShip, FaCertificate, FaSms, FaFlag } from 'react-icons/fa'
import { sendSMS } from '../utils/smsAPI'

function InternationalMarkets() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')

  const exportOpportunities = [
    {
      country: 'Uganda',
      flag: '🇺🇬',
      crops: ['Maize', 'Beans', 'Rice'],
      demand: 'High',
      price: 'KES 55/kg (Maize)',
      requirements: 'KEBS Certificate, Phytosanitary Certificate',
      contact: '+256700123456'
    },
    {
      country: 'Tanzania',
      flag: '🇹🇿',
      crops: ['Potatoes', 'Onions', 'Tomatoes'],
      demand: 'Medium',
      price: 'KES 95/kg (Potatoes)',
      requirements: 'Export License, Quality Certificate',
      contact: '+255700123456'
    },
    {
      country: 'Rwanda',
      flag: '🇷🇼',
      crops: ['Coffee', 'Tea', 'Vegetables'],
      demand: 'High',
      price: 'USD 4.50/kg (Coffee)',
      requirements: 'Organic Certificate, Export Permit',
      contact: '+250700123456'
    }
  ]

  const sendExportInfo = async (opportunity) => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    const message = `EXPORT OPPORTUNITY: ${opportunity.country} ${opportunity.flag} - ${opportunity.crops.join(', ')}. Demand: ${opportunity.demand}. Price: ${opportunity.price}. Requirements: ${opportunity.requirements}. Contact: ${opportunity.contact}`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Export opportunity sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">International Market Access</h1>
          <p className="text-gray-600">Explore export opportunities across East Africa</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg shadow-orange-500/20 p-6 mb-8">
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+254700000000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exportOpportunities.map((opportunity, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg shadow-orange-500/20 p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{opportunity.flag}</div>
                <h3 className="text-xl font-semibold text-gray-800">{opportunity.country}</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Crops in Demand:</span>
                  <p className="text-gray-600">{opportunity.crops.join(', ')}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Demand Level:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    opportunity.demand === 'High' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {opportunity.demand}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Current Price:</span>
                  <p className="text-gray-600">{opportunity.price}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Requirements:</span>
                  <p className="text-gray-600 text-xs">{opportunity.requirements}</p>
                </div>
              </div>
              
              <button
                onClick={() => sendExportInfo(opportunity)}
                className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
              >
                <FaSms className="inline mr-1" /> Get Export Info
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InternationalMarkets