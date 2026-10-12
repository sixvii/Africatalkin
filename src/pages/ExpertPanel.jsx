import { useState } from 'react'
import { FaUsers, FaVideo, FaPhone, FaSms, FaCalendarAlt, FaGraduationCap, FaLeaf, FaChartLine, FaStar, FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import { GiCow } from 'react-icons/gi'
import { sendSMS } from '../utils/smsAPI'

function ExpertPanel() {
  const [activeTab, setActiveTab] = useState('experts')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedExpert, setSelectedExpert] = useState(null)
  const [consultationType, setConsultationType] = useState('sms')

  const experts = [
    {
      id: 1,
      name: "Dr. Amina Hassan",
      specialty: "Crop Science",
      experience: "15 years",
      rating: 4.9,
      location: "Kano, Nigeria",
      languages: ["English", "Hausa"],
      expertise: ["Maize production", "Pest management", "Soil health"],
      availability: "Mon-Fri 9AM-5PM",
      consultationFee: "₦2,000/session",
      bio: "Leading expert in sustainable crop production with focus on smallholder farmers"
    },
    {
      id: 2,
      name: "Prof. John Okafor",
      specialty: "Livestock Management",
      experience: "20 years",
      rating: 4.8,
      location: "Ibadan, Nigeria",
      languages: ["English", "Yoruba", "Igbo"],
      expertise: ["Cattle breeding", "Animal nutrition", "Disease prevention"],
      availability: "Tue-Sat 8AM-6PM",
      consultationFee: "₦2,500/session",
      bio: "Veterinary expert specializing in tropical livestock management"
    },
    {
      id: 3,
      name: "Dr. Fatima Abdullahi",
      specialty: "Agricultural Finance",
      experience: "12 years",
      rating: 4.7,
      location: "Lagos, Nigeria",
      languages: ["English", "Hausa"],
      expertise: ["Farm loans", "Investment planning", "Market analysis"],
      availability: "Mon-Thu 10AM-4PM",
      consultationFee: "₦3,000/session",
      bio: "Financial advisor helping farmers access credit and improve profitability"
    },
    {
      id: 4,
      name: "Eng. Samuel Adebayo",
      specialty: "Agricultural Technology",
      experience: "10 years",
      rating: 4.6,
      location: "Abuja, Nigeria",
      languages: ["English", "Yoruba"],
      expertise: ["Irrigation systems", "Farm mechanization", "Solar solutions"],
      availability: "Mon-Fri 8AM-5PM",
      consultationFee: "₦2,200/session",
      bio: "Agricultural engineer focused on technology adoption for small farms"
    }
  ]

  const consultationHistory = [
    {
      id: 1,
      expert: "Dr. Amina Hassan",
      topic: "Maize pest control",
      date: "2024-01-10",
      type: "SMS",
      status: "Completed",
      rating: 5
    },
    {
      id: 2,
      expert: "Prof. John Okafor",
      topic: "Cattle vaccination schedule",
      date: "2024-01-08",
      type: "Phone",
      status: "Completed",
      rating: 4
    }
  ]

  const upcomingSessions = [
    {
      id: 1,
      expert: "Dr. Fatima Abdullahi",
      topic: "Farm loan application",
      date: "2024-01-18",
      time: "2:00 PM",
      type: "Video Call"
    }
  ]

  const requestConsultation = async (expert) => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }
    
    setLoading(true)
    const message = `CONSULTATION REQUEST: Expert: ${expert.name} (${expert.specialty}). Fee: ${expert.consultationFee}. Available: ${expert.availability}. We'll connect you soon! Reply with your farming question.`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Consultation request sent! Expert will contact you soon.')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  const sendQuickQuestion = async (expert) => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }
    
    setLoading(true)
    const message = `QUICK QUESTION SERVICE: Send your farming question to ${expert.name} (${expert.specialty}). Fee: ₦500 for SMS response. Expert will reply within 2 hours. Send your question now!`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Quick question service activated! Send your question via SMS.')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-purple-50 py-4 sm:py-6 lg:py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Expert Panel</h1>
          <p className="text-sm sm:text-base text-gray-600 px-2">Connect with agricultural experts for professional advice</p>
        </div>

        {/* Phone Input */}
        <div className="bg-white shadow-lg p-4 sm:p-6 mb-6" style={{borderRadius: '2px'}}>
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number for Expert Consultation</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+234 XXX XXX XXXX"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              style={{borderRadius: '2px'}}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-6 bg-white shadow-lg p-2" style={{borderRadius: '2px'}}>
          {[
            { key: 'experts', label: 'Find Experts', icon: FaUsers },
            { key: 'sessions', label: 'My Sessions', icon: FaCalendarAlt },
            { key: 'history', label: 'History', icon: FaClock }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center px-4 py-2 mx-1 mb-2 transition ${
                activeTab === tab.key 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
              }`}
              style={{borderRadius: '2px'}}
            >
              <tab.icon className="mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Expert Directory */}
        {activeTab === 'experts' && (
          <div className="grid md:grid-cols-2 gap-6">
            {experts.map(expert => (
              <div key={expert.id} className="bg-white shadow-lg p-6" style={{borderRadius: '2px'}}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{expert.name}</h3>
                    <p className="text-purple-600 font-medium">{expert.specialty}</p>
                    <div className="flex items-center mt-1">
                      <FaStar className="text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">{expert.rating} ({expert.experience})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      {expert.location}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Expertise:</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {expert.expertise.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs" style={{borderRadius: '2px'}}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700">Languages:</h4>
                    <p className="text-sm text-gray-600">{expert.languages.join(', ')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700">Availability:</h4>
                    <p className="text-sm text-gray-600">{expert.availability}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700">Consultation Fee:</h4>
                    <p className="text-sm font-medium text-green-600">{expert.consultationFee}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{expert.bio}</p>

                <div className="flex space-x-2">
                  <button
                    onClick={() => requestConsultation(expert)}
                    disabled={loading}
                    className="flex-1 bg-purple-500 text-white py-2 px-4 hover:bg-purple-600 transition flex items-center justify-center"
                    style={{borderRadius: '2px'}}
                  >
                    <FaPhone className="mr-2" />
                    Book Session
                  </button>
                  
                  <button
                    onClick={() => sendQuickQuestion(expert)}
                    disabled={loading}
                    className="flex-1 bg-green-500 text-white py-2 px-4 hover:bg-green-600 transition flex items-center justify-center"
                    style={{borderRadius: '2px'}}
                  >
                    <FaSms className="mr-2" />
                    Quick Question
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upcoming Sessions */}
        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="bg-white shadow-lg p-6" style={{borderRadius: '2px'}}>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Sessions</h3>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map(session => (
                    <div key={session.id} className="border border-gray-200 p-4" style={{borderRadius: '2px'}}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800">{session.expert}</h4>
                          <p className="text-gray-600">{session.topic}</p>
                          <p className="text-sm text-gray-500">{session.date} at {session.time}</p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm" style={{borderRadius: '2px'}}>
                          {session.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No upcoming sessions. Book a consultation with an expert!</p>
              )}
            </div>
          </div>
        )}

        {/* Consultation History */}
        {activeTab === 'history' && (
          <div className="bg-white shadow-lg p-6" style={{borderRadius: '2px'}}>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Consultation History</h3>
            {consultationHistory.length > 0 ? (
              <div className="space-y-4">
                {consultationHistory.map(consultation => (
                  <div key={consultation.id} className="border border-gray-200 p-4" style={{borderRadius: '2px'}}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">{consultation.expert}</h4>
                        <p className="text-gray-600">{consultation.topic}</p>
                        <p className="text-sm text-gray-500">{consultation.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm mb-2 block" style={{borderRadius: '2px'}}>
                          {consultation.status}
                        </span>
                        <div className="flex items-center">
                          {[...Array(consultation.rating)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No consultation history yet. Start by booking your first session!</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpertPanel
