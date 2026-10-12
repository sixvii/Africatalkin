import { useState } from 'react'
import { FaUsers, FaPlus, FaSms, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaLeaf, FaHandshake, FaChartLine, FaGraduationCap } from 'react-icons/fa'
import { sendSMS } from '../utils/smsAPI'

function FarmerGroups() {
  const [activeTab, setActiveTab] = useState('groups')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)

  // Form states
  const [groupName, setGroupName] = useState('')
  const [groupLocation, setGroupLocation] = useState('')
  const [groupCrop, setGroupCrop] = useState('maize')
  const [memberName, setMemberName] = useState('')
  const [memberPhone, setMemberPhone] = useState('')

  const farmerGroups = [
    {
      id: 1,
      name: "Sunrise Maize Farmers",
      location: "Kaduna State",
      members: 45,
      crop: "Maize",
      established: "2022",
      contact: "+234801234567",
      description: "Cooperative focused on maize production and marketing",
      activities: ["Bulk purchasing", "Joint marketing", "Training sessions"],
      nextMeeting: "2024-01-15"
    },
    {
      id: 2,
      name: "Green Valley Cooperative",
      location: "Ogun State",
      members: 32,
      crop: "Cassava",
      established: "2021",
      contact: "+234802345678",
      description: "Cassava farmers working together for better yields",
      activities: ["Processing equipment sharing", "Market access", "Technical support"],
      nextMeeting: "2024-01-20"
    },
    {
      id: 3,
      name: "Unity Rice Growers",
      location: "Kebbi State",
      members: 67,
      crop: "Rice",
      established: "2020",
      contact: "+234803456789",
      description: "Large rice farming cooperative with modern techniques",
      activities: ["Irrigation management", "Quality control", "Export coordination"],
      nextMeeting: "2024-01-18"
    },
    {
      id: 4,
      name: "Women in Agriculture",
      location: "Cross River State",
      members: 28,
      crop: "Vegetables",
      established: "2023",
      contact: "+234804567890",
      description: "Empowering women through sustainable farming",
      activities: ["Organic farming", "Market gardening", "Financial literacy"],
      nextMeeting: "2024-01-22"
    }
  ]

  const groupBenefits = [
    { icon: FaHandshake, title: "Collective Bargaining", desc: "Better prices through group negotiations" },
    { icon: FaLeaf, title: "Shared Resources", desc: "Equipment and input cost sharing" },
    { icon: FaGraduationCap, title: "Knowledge Sharing", desc: "Learn from experienced farmers" },
    { icon: FaChartLine, title: "Market Access", desc: "Direct access to larger markets" }
  ]

  const joinGroup = async (group) => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }

    setLoading(true)
    const message = `GROUP JOIN REQUEST: You've requested to join "${group.name}" in ${group.location}. Contact: ${group.contact}. Next meeting: ${group.nextMeeting}. We'll connect you with the group coordinator.`

    try {
      await sendSMS([phoneNumber], message)
      alert(`Join request sent for ${group.name}!`)
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  const createGroup = async () => {
    if (!groupName || !groupLocation || !memberName || !memberPhone || !phoneNumber) {
      alert('Please fill all fields')
      return
    }

    setLoading(true)
    const message = `NEW GROUP CREATED: "${groupName}" in ${groupLocation} for ${groupCrop} farming. Founder: ${memberName} (${memberPhone}). We'll help you find members and provide support resources.`

    try {
      await sendSMS([phoneNumber], message)
      alert('Group creation request sent!')
      // Reset form
      setGroupName('')
      setGroupLocation('')
      setMemberName('')
      setMemberPhone('')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  const sendGroupUpdate = async (group) => {
    if (!phoneNumber) {
      alert('Please enter your phone number first')
      return
    }

    setLoading(true)
    const message = `GROUP UPDATE: ${group.name} - Next meeting: ${group.nextMeeting}. Activities: ${group.activities.join(', ')}. Contact coordinator: ${group.contact} for more details.`

    try {
      await sendSMS([phoneNumber], message)
      alert('Group update sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-orange-50 py-4 sm:py-6 lg:py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Farmer Groups</h1>
          <p className="text-sm sm:text-base text-gray-600 px-2">Connect with local farming cooperatives and communities</p>
        </div>

        {/* Phone Number Input */}
        <div className="bg-white shadow-lg shadow-orange-500/20 p-4 sm:p-6 mb-6 sm:mb-8" style={{borderRadius: '2px'}}>
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number for Group Communications</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+234700000000"
              className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
              style={{borderRadius: '2px'}}
            />
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {groupBenefits.map((benefit, index) => (
            <div key={index} className="bg-white p-4 sm:p-6 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 hover-lift animate-slideUp" style={{borderRadius: '2px', animationDelay: `${index * 0.1}s`}}>
              <benefit.icon className="text-2xl sm:text-3xl text-orange-500 mb-3 sm:mb-4" />
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white shadow-lg shadow-orange-500/20 mb-6 sm:mb-8" style={{borderRadius: '2px'}}>
          <div className="border-b border-gray-200">
            <nav className="flex space-x-2 sm:space-x-4 lg:space-x-8 px-2 sm:px-4 lg:px-6 overflow-x-auto">
              {[
                { id: 'groups', label: 'Find Groups', icon: FaUsers },
                { id: 'create', label: 'Create Group', icon: FaPlus },
                { id: 'meetings', label: 'Meetings', icon: FaCalendarAlt },
                { id: 'resources', label: 'Resources', icon: FaGraduationCap }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 sm:py-4 px-1 sm:px-2 border-b-2 font-medium text-xs sm:text-sm flex items-center whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'border-orange-500 text-orange-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-3 sm:p-4 lg:p-6">
            {/* Find Groups Tab */}
            {activeTab === 'groups' && (
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Available Farmer Groups</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {farmerGroups.map((group, index) => (
                    <div key={group.id} className="bg-white border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover-lift animate-slideUp" style={{borderRadius: '2px', animationDelay: `${index * 0.1}s`}}>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                        <div className="flex-1">
                          <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{group.name}</h4>
                          <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="mr-2 text-orange-500" />
                              {group.location}
                            </div>
                            <div className="flex items-center">
                              <FaUsers className="mr-2 text-orange-500" />
                              {group.members} members
                            </div>
                            <div className="flex items-center">
                              <FaLeaf className="mr-2 text-orange-500" />
                              {group.crop} farming
                            </div>
                            <div className="flex items-center">
                              <FaPhone className="mr-2 text-orange-500" />
                              {group.contact}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          Est. {group.established}
                        </div>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-gray-600 mb-4">{group.description}</p>
                      
                      <div className="mb-4">
                        <h5 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Activities:</h5>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {group.activities.map((activity, idx) => (
                            <span key={idx} className="bg-orange-100 text-orange-700 px-2 py-1 text-xs" style={{borderRadius: '2px'}}>
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => joinGroup(group)}
                          disabled={loading || !phoneNumber}
                          className="flex-1 bg-orange-500 text-white py-2 px-3 hover:bg-orange-600 transition disabled:opacity-50 flex items-center justify-center text-xs sm:text-sm"
                          style={{borderRadius: '2px'}}
                        >
                          <FaSms className="mr-2" />
                          {loading ? 'Sending...' : 'Join Group'}
                        </button>
                        <button
                          onClick={() => sendGroupUpdate(group)}
                          disabled={loading || !phoneNumber}
                          className="flex-1 border border-orange-500 text-orange-500 py-2 px-3 hover:bg-orange-50 transition disabled:opacity-50 flex items-center justify-center text-xs sm:text-sm"
                          style={{borderRadius: '2px'}}
                        >
                          <FaCalendarAlt className="mr-2" />
                          Get Updates
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Create Group Tab */}
            {activeTab === 'create' && (
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Create New Farmer Group</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                      <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="e.g., Unity Farmers Cooperative"
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
                        style={{borderRadius: '2px'}}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={groupLocation}
                        onChange={(e) => setGroupLocation(e.target.value)}
                        placeholder="e.g., Lagos State"
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
                        style={{borderRadius: '2px'}}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Crop</label>
                      <select
                        value={groupCrop}
                        onChange={(e) => setGroupCrop(e.target.value)}
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
                        style={{borderRadius: '2px'}}
                      >
                        <option value="maize">Maize</option>
                        <option value="rice">Rice</option>
                        <option value="cassava">Cassava</option>
                        <option value="beans">Beans</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="mixed">Mixed Farming</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                      <input
                        type="text"
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
                        style={{borderRadius: '2px'}}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Phone Number</label>
                      <input
                        type="tel"
                        value={memberPhone}
                        onChange={(e) => setMemberPhone(e.target.value)}
                        placeholder="+234700000000"
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
                        style={{borderRadius: '2px'}}
                      />
                    </div>
                    <button
                      onClick={createGroup}
                      disabled={loading || !phoneNumber}
                      className="w-full bg-orange-500 text-white py-3 hover:bg-orange-600 transition disabled:opacity-50 flex items-center justify-center"
                      style={{borderRadius: '2px'}}
                    >
                      <FaSms className="mr-2" />
                      {loading ? 'Creating...' : 'Create Group & Send SMS'}
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 p-4 sm:p-6" style={{borderRadius: '2px'}}>
                    <h4 className="font-medium text-gray-800 mb-3">Group Creation Benefits</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Connect with nearby farmers</p>
                      <p>• Access to group buying discounts</p>
                      <p>• Shared equipment and resources</p>
                      <p>• Technical support and training</p>
                      <p>• Better market access</p>
                      <p>• Government program eligibility</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Meetings Tab */}
            {activeTab === 'meetings' && (
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Upcoming Group Meetings</h3>
                
                <div className="space-y-4">
                  {farmerGroups.map((group, index) => (
                    <div key={group.id} className="bg-white border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300" style={{borderRadius: '2px'}}>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex-1">
                          <h4 className="text-base font-semibold text-gray-800">{group.name}</h4>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <FaCalendarAlt className="mr-2 text-orange-500" />
                            Next meeting: {group.nextMeeting}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <FaMapMarkerAlt className="mr-2 text-orange-500" />
                            {group.location}
                          </div>
                        </div>
                        <button
                          onClick={() => sendGroupUpdate(group)}
                          disabled={loading || !phoneNumber}
                          className="bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 transition disabled:opacity-50 flex items-center text-sm"
                          style={{borderRadius: '2px'}}
                        >
                          <FaSms className="mr-2" />
                          Get Reminder
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Group Management Resources</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-orange-50 border border-orange-200 p-4 sm:p-6" style={{borderRadius: '2px'}}>
                    <h4 className="font-medium text-orange-800 mb-3">Leadership Training</h4>
                    <div className="space-y-2 text-sm text-orange-700">
                      <p>• Group management skills</p>
                      <p>• Financial management</p>
                      <p>• Conflict resolution</p>
                      <p>• Meeting facilitation</p>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-4 sm:p-6" style={{borderRadius: '2px'}}>
                    <h4 className="font-medium text-green-800 mb-3">Technical Support</h4>
                    <div className="space-y-2 text-sm text-green-700">
                      <p>• Agricultural best practices</p>
                      <p>• Market linkage support</p>
                      <p>• Equipment sharing programs</p>
                      <p>• Quality control training</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 sm:p-6" style={{borderRadius: '2px'}}>
                    <h4 className="font-medium text-blue-800 mb-3">Financial Services</h4>
                    <div className="space-y-2 text-sm text-blue-700">
                      <p>• Group savings programs</p>
                      <p>• Micro-credit access</p>
                      <p>• Insurance products</p>
                      <p>• Investment opportunities</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 p-4 sm:p-6" style={{borderRadius: '2px'}}>
                    <h4 className="font-medium text-purple-800 mb-3">Technology Access</h4>
                    <div className="space-y-2 text-sm text-purple-700">
                      <p>• SMS communication systems</p>
                      <p>• Weather information</p>
                      <p>• Market price updates</p>
                      <p>• Digital record keeping</p>
                    </div>
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

export default FarmerGroups
