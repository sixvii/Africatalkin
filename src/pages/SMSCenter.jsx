import { useState, useEffect } from 'react'
import { FaSms, FaPaperPlane, FaUsers, FaHistory, FaPlus, FaTrash, FaEdit, FaCopy, FaCheck, FaExclamationTriangle, FaChartLine, FaLeaf } from 'react-icons/fa'
import { sendSMS, getSMSHistory, validatePhoneNumber, checkSMSBalance } from '../utils/smsAPI'

function SMSCenter() {
  const [activeTab, setActiveTab] = useState('compose')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [messageType, setMessageType] = useState('general')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [smsHistory, setSmsHistory] = useState([])
  const [balance, setBalance] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState('')
  const [bulkMessage, setBulkMessage] = useState('')
  const [scheduleType, setScheduleType] = useState('now')
  const [contactGroups, setContactGroups] = useState([
    { id: 1, name: 'Farmers', contacts: ['+254700000000', '+254700000001'] },
    { id: 2, name: 'Agricultural Communities', contacts: ['+254700000002', '+254700000003'] }
  ])

  useEffect(() => {
    loadSMSHistory()
    loadBalance()
  }, [])

  const loadSMSHistory = async () => {
    try {
      const history = await getSMSHistory()
      setSmsHistory(history)
    } catch (error) {
      console.error('Failed to load SMS history:', error)
    }
  }

  const loadBalance = async () => {
    try {
      const balanceData = await checkSMSBalance()
      setBalance(balanceData)
    } catch (error) {
      console.error('Failed to load balance:', error)
    }
  }

  const [templates] = useState([
    { id: 1, name: 'Market Alert', content: 'MARKET ALERT: {crop} - NAIRA {price}/{unit} {trend} in {market} market. Trade wisely!' },
    { id: 2, name: 'Weather Update', content: 'WEATHER: {condition} expected. Temperature: {temp}°C. Plan your farming activities accordingly.' },
    { id: 3, name: 'Farming Tip', content: 'FARMING TIP: {tip}. For more info, visit our platform. Happy farming!' },
    { id: 4, name: 'Price Forecast', content: 'FORECAST: {crop} demand {level}. Price trend: {trend}. Confidence: {confidence}%. Plan ahead!' }
  ])

  const handleSendSMS = async () => {
    // Use single phone number for compose tab
    const validNumbers = phoneNumber.trim() ? [phoneNumber.trim()] : []
    
    if (validNumbers.length === 0) {
      setStatus('Please enter a phone number')
      return
    }
    
    if (!message.trim()) {
      setStatus('Please enter a message')
      return
    }

    setLoading(true)
    setStatus('Sending SMS...')

    try {
      await sendSMS(validNumbers, message)
      setStatus(`SMS sent successfully to ${validNumbers.length} recipient(s)!`)
      
      // Add to history
      const newEntry = {
        id: Date.now(),
        to: validNumbers.join(', '),
        message: message,
        timestamp: new Date().toLocaleString(),
        status: 'Delivered'
      }
      setSmsHistory([newEntry, ...smsHistory])
      
      // Clear form
      setMessage('')
      setPhoneNumber('')
    } catch (error) {
      setStatus('Failed to send SMS. Please try again.')
      console.error('SMS failed:', error)
    }
    
    setLoading(false)
  }

  const useTemplate = (template) => {
    setMessage(template.content)
    setActiveTab('compose')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setStatus('Copied to clipboard!')
    setTimeout(() => setStatus(''), 2000)
  }

  const handleBulkSMS = async () => {
    const selectedGroupData = contactGroups.find(g => g.id === parseInt(selectedGroup))
    
    if (!selectedGroupData) {
      setStatus('Please select a contact group')
      return
    }
    
    if (!bulkMessage.trim()) {
      setStatus('Please enter a message')
      return
    }

    setLoading(true)
    setStatus('Sending bulk SMS...')

    try {
      await sendSMS(selectedGroupData.contacts, bulkMessage)
      setStatus(`Bulk SMS sent successfully to ${selectedGroupData.contacts.length} recipients!`)
      
      // Add to history
      const newEntry = {
        id: Date.now(),
        to: `${selectedGroupData.name} (${selectedGroupData.contacts.length} contacts)`,
        message: bulkMessage,
        timestamp: new Date().toLocaleString(),
        status: 'Delivered'
      }
      setSmsHistory([newEntry, ...smsHistory])
      
      // Clear form
      setBulkMessage('')
      setSelectedGroup('')
    } catch (error) {
      setStatus('Failed to send bulk SMS. Please try again.')
      console.error('Bulk SMS failed:', error)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white py-4 sm:py-6 lg:py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Balance */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4">SMS Center</h1>
          <p className="text-sm sm:text-base text-gray-600 px-2">Send bulk SMS messages to farmers and agricultural communities</p>
          {balance && (
            <div className="mt-2 sm:mt-3 lg:mt-4 inline-flex items-center bg-green-50 text-green-700 px-3 sm:px-4 py-2 text-xs sm:text-sm lg:text-base" style={{borderRadius: '2px'}}>
              <FaCheck className="mr-2" />
              Balance: {balance.balance} {balance.currency}
            </div>
          )}
        </div>

        {/* API Status Indicator */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-blue-500 mr-2" />
            <span className="text-blue-700 text-sm">
              {import.meta.env.VITE_AT_API_KEY ? 
                'Connected to Africa\'s Talking SMS API' : 
                'Using mock SMS API - Configure your API keys in .env file'
              }
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white shadow-lg shadow-orange-500/20 mb-4 sm:mb-6 lg:mb-8" style={{borderRadius: '2px'}}>
          <div className="border-b border-gray-200">
            <nav className="flex space-x-1 sm:space-x-2 lg:space-x-4 px-2 sm:px-4 lg:px-6 overflow-x-auto scrollbar-hide">
              {[
                { id: 'compose', label: 'Compose', icon: FaSms },
                { id: 'templates', label: 'Templates', icon: FaCopy },
                { id: 'bulk', label: 'Bulk SMS', icon: FaUsers },
                { id: 'history', label: 'History', icon: FaHistory }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 sm:py-4 px-2 sm:px-3 lg:px-4 border-b-2 font-medium text-xs sm:text-sm flex items-center whitespace-nowrap min-w-max ${
                    activeTab === tab.id 
                      ? 'border-orange-500 text-orange-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="mr-1 sm:mr-2 text-sm sm:text-base" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-3 sm:p-4 lg:p-6">
            {/* Compose SMS Tab */}
            {activeTab === 'compose' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+254700000000"
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                      style={{borderRadius: '2px'}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
                    <select
                      value={messageType}
                      onChange={(e) => setMessageType(e.target.value)}
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                      style={{borderRadius: '2px'}}
                    >
                      <option value="general">General Information</option>
                      <option value="weather">Weather Alert</option>
                      <option value="market">Market Prices</option>
                      <option value="farming">Farming Tips</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                    style={{borderRadius: '2px'}}
                  />
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">
                    {message.length}/160 characters
                  </div>
                </div>

                <button
                  onClick={handleSendSMS}
                  disabled={loading || !phoneNumber || !message}
                  className="w-full sm:w-auto bg-orange-500 text-white px-4 sm:px-6 py-3 hover:bg-orange-600 disabled:bg-gray-400 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  style={{borderRadius: '2px'}}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <FaPaperPlane className="mr-2" />
                      Send SMS
                    </div>
                  )}
                </button>
              </div>
            )}

            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {smsTemplates.map((template, index) => (
                  <div key={index} className="bg-white border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover-lift animate-slideUp" style={{borderRadius: '2px'}}>
                    <div className="flex items-center mb-3">
                      <template.icon className="text-orange-500 text-lg sm:text-xl mr-3" />
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{template.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4 text-xs sm:text-sm">{template.content}</p>
                    <button
                      onClick={() => useTemplate(template)}
                      className="w-full bg-orange-500 text-white px-3 sm:px-4 py-2 hover:bg-orange-600 transition-all duration-300 text-xs sm:text-sm"
                      style={{borderRadius: '2px'}}
                    >
                      <FaCopy className="inline mr-1" /> Use Template
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Bulk SMS Tab */}
            {activeTab === 'bulk' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Group</label>
                    <select
                      value={selectedGroup}
                      onChange={(e) => setSelectedGroup(e.target.value)}
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                      style={{borderRadius: '2px'}}
                    >
                      <option value="">Select a group</option>
                      {contactGroups.map(group => (
                        <option key={group.id} value={group.id}>{group.name} ({group.contacts.length} contacts)</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                    <select
                      value={scheduleType}
                      onChange={(e) => setScheduleType(e.target.value)}
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                      style={{borderRadius: '2px'}}
                    >
                      <option value="now">Send Now</option>
                      <option value="scheduled">Schedule for Later</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bulk Message</label>
                  <textarea
                    value={bulkMessage}
                    onChange={(e) => setBulkMessage(e.target.value)}
                    placeholder="Type your bulk message here..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                    style={{borderRadius: '2px'}}
                  />
                </div>

                <button
                  onClick={handleBulkSMS}
                  disabled={loading || !selectedGroup || !bulkMessage}
                  className="w-full sm:w-auto bg-orange-500 text-white px-4 sm:px-6 py-3 hover:bg-orange-600 disabled:bg-gray-400 transition-all duration-300 text-sm sm:text-base"
                  style={{borderRadius: '2px'}}
                >
                  <FaUsers className="inline mr-2" />
                  Send Bulk SMS
                </button>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-3 sm:space-y-4">
                {smsHistory.map((sms, index) => (
                  <div key={index} className="bg-white border border-gray-200 p-3 sm:p-4 hover:shadow-lg transition-all duration-300 animate-slideUp" style={{borderRadius: '2px'}}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
                          <span className="font-medium text-gray-800 text-sm sm:text-base">{sms.recipient}</span>
                          <span className="text-xs sm:text-sm text-gray-500">{sms.timestamp}</span>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base">{sms.message}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium self-start ${
                        sms.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
                        sms.status === 'Failed' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                      }`} style={{borderRadius: '2px'}}>
                        {sms.status}
                      </span>
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

export default SMSCenter
