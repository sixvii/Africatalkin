import { useState } from 'react'
import { FaGraduationCap, FaBook, FaVideo, FaSms, FaCertificate, FaUsers, FaPlay, FaDownload } from 'react-icons/fa'
import { sendSMS } from '../utils/smsAPI'
import { translateMessage } from '../utils/translations'

function Education() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [language, setLanguage] = useState('en')
  const [activeTab, setActiveTab] = useState('courses')
  const [selectedCourse, setSelectedCourse] = useState('')

  const courses = [
    {
      id: 1,
      title: 'Modern Crop Production',
      description: 'Learn latest techniques in crop farming and management',
      duration: '4 weeks',
      level: 'Beginner',
      modules: 8,
      certificate: true,
      price: 'Free',
      topics: ['Soil preparation', 'Seed selection', 'Pest management', 'Harvesting']
    },
    {
      id: 2,
      title: 'Livestock Management',
      description: 'Comprehensive guide to raising healthy livestock',
      duration: '6 weeks',
      level: 'Intermediate',
      modules: 12,
      certificate: true,
      price: 'KES 2,500',
      topics: ['Animal nutrition', 'Disease prevention', 'Breeding', 'Record keeping']
    },
    {
      id: 3,
      title: 'Agricultural Finance',
      description: 'Financial planning and management for farmers',
      duration: '3 weeks',
      level: 'Beginner',
      modules: 6,
      certificate: true,
      price: 'KES 1,500',
      topics: ['Budgeting', 'Loan applications', 'Insurance', 'Investment planning']
    },
    {
      id: 4,
      title: 'Sustainable Farming',
      description: 'Eco-friendly farming practices for long-term success',
      duration: '5 weeks',
      level: 'Advanced',
      modules: 10,
      certificate: true,
      price: 'KES 3,000',
      topics: ['Organic farming', 'Water conservation', 'Soil health', 'Carbon farming']
    }
  ]

  const tutorials = [
    {
      id: 1,
      title: 'How to Test Soil pH',
      duration: '5 minutes',
      type: 'Video',
      category: 'Soil Management',
      description: 'Learn to test and adjust soil pH for optimal crop growth'
    },
    {
      id: 2,
      title: 'Drip Irrigation Setup',
      duration: '8 minutes',
      type: 'Video',
      category: 'Water Management',
      description: 'Step-by-step guide to installing drip irrigation system'
    },
    {
      id: 3,
      title: 'Composting Basics',
      duration: '6 minutes',
      type: 'Video',
      category: 'Organic Farming',
      description: 'Make nutrient-rich compost from farm waste'
    },
    {
      id: 4,
      title: 'Chicken Vaccination Schedule',
      duration: '4 minutes',
      type: 'Audio',
      category: 'Livestock',
      description: 'Essential vaccination timeline for healthy poultry'
    }
  ]

  const expertSessions = [
    {
      id: 1,
      expert: 'Dr. Mary Wanjiku',
      title: 'Climate-Smart Agriculture',
      date: '2024-04-15',
      time: '2:00 PM',
      duration: '1 hour',
      topic: 'Adapting farming practices to climate change',
      participants: 45
    },
    {
      id: 2,
      expert: 'Prof. John Kamau',
      title: 'Integrated Pest Management',
      date: '2024-04-20',
      time: '10:00 AM',
      duration: '1.5 hours',
      topic: 'Natural pest control methods',
      participants: 32
    },
    {
      id: 3,
      expert: 'Dr. Peter Ochieng',
      title: 'Fish Farming Techniques',
      date: '2024-04-25',
      time: '3:00 PM',
      duration: '1 hour',
      topic: 'Profitable aquaculture practices',
      participants: 28
    }
  ]

  const resources = [
    {
      title: 'Crop Calendar for Kenya',
      type: 'PDF Guide',
      size: '2.5 MB',
      description: 'Planting and harvesting schedules for major crops'
    },
    {
      title: 'Livestock Disease Guide',
      type: 'PDF Manual',
      size: '4.1 MB',
      description: 'Common diseases, symptoms, and treatments'
    },
    {
      title: 'Market Price Tracker',
      type: 'Excel Sheet',
      size: '1.2 MB',
      description: 'Track and analyze commodity prices over time'
    },
    {
      title: 'Farm Budget Template',
      type: 'Excel Sheet',
      size: '800 KB',
      description: 'Plan and monitor your farm expenses and income'
    }
  ]

  const sendCourseInfo = async (course) => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    const message = translateMessage('farming_tip', language, {
      tip: `COURSE: ${course.title} - ${course.description}. Duration: ${course.duration}, Level: ${course.level}, Price: ${course.price}. Topics: ${course.topics.join(', ')}`
    })
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Course information sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  const sendTutorialLink = async (tutorial) => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    const message = `TUTORIAL: ${tutorial.title} (${tutorial.duration}) - ${tutorial.description}. Category: ${tutorial.category}. Access via SMS learning platform.`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Tutorial link sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  const registerForSession = async (session) => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    const message = `EXPERT SESSION REGISTRATION: ${session.title} by ${session.expert}. Date: ${session.date} at ${session.time}. Topic: ${session.topic}. You are registered!`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Registration confirmation sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  const sendResourceLink = async (resource) => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    const message = `RESOURCE: ${resource.title} (${resource.type}, ${resource.size}) - ${resource.description}. Download link will be sent shortly.`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Resource link sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Agricultural Education Center</h1>
          <p className="text-gray-600">Learn, grow, and succeed with expert agricultural knowledge</p>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow-lg shadow-purple-500/20 p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+254700000000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
        <div className="bg-white rounded-lg shadow-lg shadow-purple-500/20">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'courses', label: 'Courses', icon: FaGraduationCap },
                { id: 'tutorials', label: 'Tutorials', icon: FaVideo },
                { id: 'experts', label: 'Expert Sessions', icon: FaUsers },
                { id: 'resources', label: 'Resources', icon: FaBook }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500'
                  }`}
                >
                  <tab.icon className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="grid md:grid-cols-2 gap-6">
                {courses.map(course => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                          <div><span className="font-medium">Duration:</span> {course.duration}</div>
                          <div><span className="font-medium">Level:</span> {course.level}</div>
                          <div><span className="font-medium">Modules:</span> {course.modules}</div>
                          <div><span className="font-medium">Price:</span> {course.price}</div>
                        </div>
                        
                        {course.certificate && (
                          <div className="flex items-center text-xs text-green-600 mb-3">
                            <FaCertificate className="mr-1" />
                            Certificate Available
                          </div>
                        )}
                        
                        <div className="mb-4">
                          <span className="font-medium text-sm">Topics Covered:</span>
                          <ul className="text-xs text-gray-600 mt-1">
                            {course.topics.map((topic, index) => (
                              <li key={index}>• {topic}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => sendCourseInfo(course)}
                      className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
                    >
                      <FaSms className="inline mr-1" /> Get Course Info
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Tutorials Tab */}
            {activeTab === 'tutorials' && (
              <div className="grid md:grid-cols-2 gap-6">
                {tutorials.map(tutorial => (
                  <div key={tutorial.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      {tutorial.type === 'Video' ? (
                        <FaPlay className="text-red-500 text-lg mr-3" />
                      ) : (
                        <FaBook className="text-blue-500 text-lg mr-3" />
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-800">{tutorial.title}</h3>
                        <p className="text-xs text-gray-500">{tutorial.category} • {tutorial.duration}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{tutorial.description}</p>
                    
                    <button
                      onClick={() => sendTutorialLink(tutorial)}
                      className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
                    >
                      <FaSms className="inline mr-1" /> Get Tutorial
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Expert Sessions Tab */}
            {activeTab === 'experts' && (
              <div className="grid md:grid-cols-2 gap-6">
                {expertSessions.map(session => (
                  <div key={session.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{session.title}</h3>
                      <p className="text-purple-600 font-medium text-sm mb-2">by {session.expert}</p>
                      <p className="text-gray-600 text-sm mb-3">{session.topic}</p>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div><span className="font-medium">Date:</span> {session.date}</div>
                        <div><span className="font-medium">Time:</span> {session.time}</div>
                        <div><span className="font-medium">Duration:</span> {session.duration}</div>
                        <div><span className="font-medium">Participants:</span> {session.participants}</div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => registerForSession(session)}
                      className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
                    >
                      <FaUsers className="inline mr-1" /> Register
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="grid md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <FaDownload className="text-green-500 text-lg mr-3" />
                      <div>
                        <h3 className="font-semibold text-gray-800">{resource.title}</h3>
                        <p className="text-xs text-gray-500">{resource.type} • {resource.size}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    
                    <button
                      onClick={() => sendResourceLink(resource)}
                      className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
                    >
                      <FaSms className="inline mr-1" /> Get Resource
                    </button>
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

export default Education
