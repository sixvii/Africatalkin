import { useState } from 'react'
import { FaCow, FaCalendarAlt, FaSyringe, FaHeart, FaSms, FaPlus } from 'react-icons/fa'
import { sendSMS } from '../utils/smsAPI'
import { translateMessage } from '../utils/translations'

function LivestockManager() {
  const [activeTab, setActiveTab] = useState('animals')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [language, setLanguage] = useState('en')
  const [animals, setAnimals] = useState([
    { id: 1, type: 'Cattle', name: 'Bessie', age: '3 years', health: 'Good', lastVaccination: '2024-01-15', nextVaccination: '2024-07-15' },
    { id: 2, type: 'Goat', name: 'Billy', age: '2 years', health: 'Excellent', lastVaccination: '2024-02-10', nextVaccination: '2024-08-10' }
  ])

  const vaccinationSchedule = [
    { animal: 'Bessie', type: 'Cattle', vaccine: 'FMD', dueDate: '2024-07-15', status: 'Due Soon' },
    { animal: 'Billy', type: 'Goat', vaccine: 'PPR', dueDate: '2024-08-10', status: 'Upcoming' }
  ]

  const breedingCalendar = [
    { animal: 'Bessie', type: 'Cattle', lastBreeding: '2024-01-20', expectedCalving: '2024-10-20', status: 'Pregnant' },
    { animal: 'Nanny', type: 'Goat', lastBreeding: '2024-03-15', expectedKidding: '2024-08-15', status: 'Pregnant' }
  ]

  const sendVaccinationReminder = async (vaccination) => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    const message = translateMessage('livestock_alert', language, {
      message: `Vaccination reminder: ${vaccination.animal} (${vaccination.type}) needs ${vaccination.vaccine} vaccine by ${vaccination.dueDate}`
    })
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Vaccination reminder sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  const sendBreedingAlert = async (breeding) => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    const message = translateMessage('livestock_alert', language, {
      message: `Breeding alert: ${breeding.animal} expected to give birth on ${breeding.expectedCalving || breeding.expectedKidding}`
    })
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Breeding alert sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Livestock Management</h1>
          <p className="text-gray-600">Manage your animals with SMS alerts and reminders</p>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow-lg shadow-orange-500/20 p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+254700000000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="en">English</option>
                <option value="sw">Kiswahili</option>
                <option value="ki">Kikuyu</option>
                <option value="lu">Luo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg shadow-orange-500/20">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'animals', label: 'My Animals', icon: FaCow },
                { id: 'vaccination', label: 'Vaccination', icon: FaSyringe },
                { id: 'breeding', label: 'Breeding', icon: FaHeart },
                { id: 'health', label: 'Health Records', icon: FaCalendarAlt }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500'
                  }`}
                >
                  <tab.icon className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Animals Tab */}
            {activeTab === 'animals' && (
              <div className="space-y-4">
                {animals.map(animal => (
                  <div key={animal.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">{animal.name}</h3>
                        <p className="text-gray-600">{animal.type} • {animal.age}</p>
                        <p className="text-sm text-green-600">Health: {animal.health}</p>
                      </div>
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                        <FaSms className="inline mr-1" /> Send Update
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Vaccination Tab */}
            {activeTab === 'vaccination' && (
              <div className="space-y-4">
                {vaccinationSchedule.map((vaccination, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800">{vaccination.animal}</h3>
                        <p className="text-gray-600">{vaccination.vaccine} vaccine due: {vaccination.dueDate}</p>
                        <span className={`text-sm px-2 py-1 rounded ${vaccination.status === 'Due Soon' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                          {vaccination.status}
                        </span>
                      </div>
                      <button
                        onClick={() => sendVaccinationReminder(vaccination)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                      >
                        <FaSms className="inline mr-1" /> Send Reminder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Breeding Tab */}
            {activeTab === 'breeding' && (
              <div className="space-y-4">
                {breedingCalendar.map((breeding, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800">{breeding.animal}</h3>
                        <p className="text-gray-600">Expected: {breeding.expectedCalving || breeding.expectedKidding}</p>
                        <span className="text-sm px-2 py-1 rounded bg-green-100 text-green-600">{breeding.status}</span>
                      </div>
                      <button
                        onClick={() => sendBreedingAlert(breeding)}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                      >
                        <FaSms className="inline mr-1" /> Send Alert
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LivestockManager