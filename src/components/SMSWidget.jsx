import { useState } from 'react'
import { FaSms, FaPaperPlane, FaTimes, FaPhone, FaLanguage } from 'react-icons/fa'

function SMSWidget({ isOpen, onClose, defaultMessage = '', defaultRecipient = '' }) {
  const [phoneNumber, setPhoneNumber] = useState(defaultRecipient)
  const [message, setMessage] = useState(defaultMessage)
  const [language, setLanguage] = useState('en')
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState('')

  const quickMessages = [
    { label: 'Weather Alert', message: 'Weather update: Check latest forecast for your area.' },
    { label: 'Market Price', message: 'Get current market prices for your crops.' },
    { label: 'Farming Tip', message: 'Daily farming tip: Proper soil preparation is key to good yields.' },
    { label: 'Livestock Care', message: 'Reminder: Check your livestock health regularly.' }
  ]

  // Mock SMS sending function since we don't have the actual API
  const sendSMS = async (phones, message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('SMS sent to:', phones, 'Message:', message)
        resolve({ success: true })
      }, 1000)
    })
  }

  // Mock translation function
  const translateMessage = (template, lang, variables) => {
    if (template === 'custom') {
      return variables.message || ''
    }
    return variables.message || ''
  }

  const handleSendSMS = async () => {
    if (!phoneNumber || !message) {
      setStatus('Please enter phone number and message')
      return
    }

    setIsSending(true)
    setStatus('Sending...')

    try {
      const translatedMessage = translateMessage('custom', language, { message })
      await sendSMS([phoneNumber], translatedMessage)
      setStatus('Message sent successfully!')
      
      // Clear form after successful send
      setTimeout(() => {
        setMessage('')
        setPhoneNumber('')
        setStatus('')
        onClose()
      }, 2000)
    } catch (error) {
      setStatus('Failed to send message. Please try again.')
      console.error('SMS failed:', error)
    } finally {
      setIsSending(false)
    }
  }

  const handleQuickMessage = (quickMsg) => {
    setMessage(quickMsg.message)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <FaSms className="text-orange-500 text-xl mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Send SMS</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaPhone className="inline mr-1" />
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+254700000000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaLanguage className="inline mr-1" />
              Language
            </label>
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

          {/* Quick Messages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quick Messages</label>
            <div className="grid grid-cols-2 gap-2">
              {quickMessages.map((quickMsg, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickMessage(quickMsg)}
                  className="p-2 text-xs bg-gray-100 hover:bg-orange-100 hover:text-orange-600 rounded-lg transition-colors text-left"
                >
                  {quickMsg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={4}
              maxLength={160}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {message.length}/160 characters
            </div>
          </div>

          {/* Status */}
          {status && (
            <div className={`p-3 rounded-lg text-sm ${
              status.includes('success') 
                ? 'bg-green-100 text-green-700' 
                : status.includes('Failed') 
                ? 'bg-red-100 text-red-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {status}
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSendSMS}
              disabled={isSending || !phoneNumber || !message}
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isSending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <FaPaperPlane className="mr-2" />
                  Send SMS
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SMSWidget
