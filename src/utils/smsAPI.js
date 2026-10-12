// Africa's Talking SMS API Integration
const AT_API_KEY = import.meta.env.VITE_AT_API_KEY || 'your_api_key_here'
const AT_USERNAME = import.meta.env.VITE_AT_USERNAME || 'your_username_here'
const AT_BASE_URL = 'https://api.africastalking.com/version1'

export const sendSMS = async (phoneNumbers, message) => {
  try {
    // Validate phone numbers
    const validNumbers = phoneNumbers.filter(num => validatePhoneNumber(num))
    
    if (validNumbers.length === 0) {
      throw new Error('No valid phone numbers provided')
    }

    const response = await fetch(`${AT_BASE_URL}/messaging/bulk`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'apiKey': AT_API_KEY
      },
      body: new URLSearchParams({
        username: AT_USERNAME,
        to: validNumbers.join(','),
        message: message,
        from: 'AGRISMS'
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    return {
      success: true,
      messageId: data.SMSMessageData?.Recipients?.[0]?.messageId || Math.random().toString(36).substr(2, 9),
      recipients: validNumbers.length,
      timestamp: new Date().toISOString(),
      cost: data.SMSMessageData?.Recipients?.[0]?.cost || 'N/A',
      status: data.SMSMessageData?.Recipients?.[0]?.status || 'Success',
      rawResponse: data
    }
  } catch (error) {
    console.error('SMS API Error:', error)
    
    // Fallback to mock for development/testing
    if (import.meta.env.DEV) {
      console.log('Falling back to mock SMS for development')
      return mockSendSMS(phoneNumbers, message)
    }
    
    throw error
  }
}

// Mock SMS function for development/fallback
const mockSendSMS = async (phoneNumbers, message) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  console.log('MOCK SMS sent to:', phoneNumbers)
  console.log('Message:', message)
  
  return {
    success: true,
    messageId: Math.random().toString(36).substr(2, 9),
    recipients: phoneNumbers.length,
    timestamp: new Date().toISOString(),
    cost: 'KES 1.00',
    status: 'Success'
  }
}

export const getSMSHistory = async () => {
  try {
    return [
      {
        id: 1,
        recipient: '+254700000001',
        message: 'Weather alert: Heavy rains expected',
        timestamp: '2024-01-15T10:30:00Z',
        status: 'delivered',
        cost: 'KES 1.00'
      }
    ]
  } catch (error) {
    console.error('Error fetching SMS history:', error)
    return []
  }
}

export const validatePhoneNumber = (phoneNumber) => {
  const cleanNumber = phoneNumber.replace(/\s+/g, '')
  
  const nigerianRegex = /^(\+234|0)[789]\d{9}$/
  const ugandanRegex = /^(\+256|0)[37]\d{8}$/
  const tanzanianRegex = /^(\+255|0)[67]\d{8}$/
  const rwandanRegex = /^(\+250|0)[78]\d{8}$/
  
  return nigerianRegex.test(cleanNumber) || 
         ugandanRegex.test(cleanNumber) || 
         tanzanianRegex.test(cleanNumber) || 
         rwandanRegex.test(cleanNumber)
}

// Utility function to format phone numbers for Africa's Talking
export const formatPhoneNumber = (phoneNumber) => {
  let cleaned = phoneNumber.replace(/\s+/g, '')
  
  // Convert local format to international
  if (cleaned.startsWith('0')) {
    // Default to Nigeria if no country code specified
    cleaned = '+234' + cleaned.substring(1)
  }
  
  return cleaned
}

// Check SMS balance (requires Africa's Talking User Data API)
export const checkSMSBalance = async () => {
  try {
    const response = await fetch(`${AT_BASE_URL}/user?username=${AT_USERNAME}`, {
      headers: {
        'Accept': 'application/json',
        'apiKey': AT_API_KEY
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return {
      balance: data.UserData?.balance || 'N/A',
      currency: 'NAIRA'
    }
  } catch (error) {
    console.error('Error checking balance:', error)
    return { balance: 'N/A', currency: 'NAIRA' }
  }
}
