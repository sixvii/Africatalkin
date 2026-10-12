// API Service for the Africa farming application
// This service handles all API calls and provides fallback to mock data

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.africastalking.com/version1/messaging/bulk'
const API_KEY = import.meta.env.VITE_API_KEY || ''

// Generic API call function with error handling
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        ...options.headers
      },
      ...options
    })

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error)
    throw error
  }
}

// Weather API Service
export const weatherService = {
  // Get current weather data
  getCurrentWeather: async (location = 'Lagos') => {
    try {
      // Try OpenWeatherMap API first
      const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY
      if (weatherApiKey) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}&units=metric`
        )
        
        if (response.ok) {
          const data = await response.json()
          return {
            current: {
              temperature: Math.round(data.main.temp),
              humidity: data.main.humidity,
              rainfall: data.rain?.['1h'] || 0,
              windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
              condition: data.weather[0].main
            }
          }
        }
      }
      
      // Fallback to mock data
      return await import('./mockData.js').then(module => module.weatherData)
    } catch (error) {
      console.error('Weather API error:', error)
      // Return mock data as fallback
      return await import('./mockData.js').then(module => module.weatherData)
    }
  },

  // Get weather forecast
  getForecast: async (location = 'Lagos') => {
    try {
      const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY
      if (weatherApiKey) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${weatherApiKey}&units=metric`
        )
        
        if (response.ok) {
          const data = await response.json()
          const forecast = data.list.slice(0, 4).map((item, index) => {
            const date = new Date(item.dt * 1000)
            const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday']
            return {
              day: days[index] || date.toLocaleDateString('en-US', { weekday: 'long' }),
              high: Math.round(item.main.temp_max),
              low: Math.round(item.main.temp_min),
              condition: item.weather[0].main,
              rainfall: item.rain?.['3h'] || 0
            }
          })
          
          return { forecast }
        }
      }
      
      // Fallback to mock data
      return await import('./mockData.js').then(module => module.weatherData)
    } catch (error) {
      console.error('Weather forecast API error:', error)
      return await import('./mockData.js').then(module => module.weatherData)
    }
  }
}

// Market Prices API Service
export const marketService = {
  // Get current market prices
  getMarketPrices: async () => {
    try {
      // Try to fetch from your backend API
      const data = await apiCall('/market/prices')
      return data
    } catch (error) {
      console.error('Market prices API error:', error)
      // Fallback to mock data
      return await import('./mockData.js').then(module => module.marketPrices)
    }
  },

  // Get price history for a specific commodity
  getPriceHistory: async (commodity, days = 30) => {
    try {
      const data = await apiCall(`/market/history/${commodity}?days=${days}`)
      return data
    } catch (error) {
      console.error('Price history API error:', error)
      // Return mock historical data
      return {
        commodity,
        history: Array.from({ length: days }, (_, i) => ({
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          price: Math.floor(Math.random() * 100) + 50
        })).reverse()
      }
    }
  },

  // Subscribe to price alerts
  subscribeToPriceAlerts: async (phoneNumber, commodity, threshold) => {
    try {
      const data = await apiCall('/market/alerts/subscribe', {
        method: 'POST',
        body: JSON.stringify({
          phoneNumber,
          commodity,
          threshold
        })
      })
      return data
    } catch (error) {
      console.error('Price alert subscription error:', error)
      // Return mock success response
      return {
        success: true,
        message: `Price alerts activated for ${commodity}`,
        alertId: Math.random().toString(36).substr(2, 9)
      }
    }
  }
}

// Farmer Profiles API Service
export const farmerService = {
  // Get all farmer profiles
  getFarmerProfiles: async () => {
    try {
      const data = await apiCall('/farmers')
      return data
    } catch (error) {
      console.error('Farmer profiles API error:', error)
      // Fallback to mock data
      return await import('./mockData.js').then(module => module.farmerProfiles)
    }
  },

  // Get specific farmer profile
  getFarmerProfile: async (farmerId) => {
    try {
      const data = await apiCall(`/farmers/${farmerId}`)
      return data
    } catch (error) {
      console.error('Farmer profile API error:', error)
      // Return mock farmer data
      return {
        id: farmerId,
        name: 'Timothy',
        location: 'Alegomeji, Lagos',
        farmSize: '5.2 acres',
        joinDate: 'July 2025',
        phone: '+2549032066315',
        crops: ['Maize', 'Beans', 'Potatoes'],
        livestock: ['Dairy Cows', 'Chickens']
      }
    }
  },

  // Create new farmer profile
  createFarmerProfile: async (farmerData) => {
    try {
      const data = await apiCall('/farmers', {
        method: 'POST',
        body: JSON.stringify(farmerData)
      })
      return data
    } catch (error) {
      console.error('Create farmer profile error:', error)
      throw error
    }
  },

  // Update farmer profile
  updateFarmerProfile: async (farmerId, farmerData) => {
    try {
      const data = await apiCall(`/farmers/${farmerId}`, {
        method: 'PUT',
        body: JSON.stringify(farmerData)
      })
      return data
    } catch (error) {
      console.error('Update farmer profile error:', error)
      throw error
    }
  }
}

// Farming Tips API Service
export const tipsService = {
  // Get farming tips
  getFarmingTips: async (category = null) => {
    try {
      const endpoint = category ? `/tips?category=${category}` : '/tips'
      const data = await apiCall(endpoint)
      return data
    } catch (error) {
      console.error('Farming tips API error:', error)
      // Fallback to mock data
      return await import('./mockData.js').then(module => module.farmingTips)
    }
  },

  // Get personalized tips based on farmer profile
  getPersonalizedTips: async (farmerId) => {
    try {
      const data = await apiCall(`/tips/personalized/${farmerId}`)
      return data
    } catch (error) {
      console.error('Personalized tips API error:', error)
      // Fallback to mock data
      return await import('./mockData.js').then(module => module.farmingTips)
    }
  }
}

// Crop Management API Service
export const cropService = {
  // Get crop data for a farmer
  getFarmerCrops: async (farmerId) => {
    try {
      const data = await apiCall(`/farmers/${farmerId}/crops`)
      return data
    } catch (error) {
      console.error('Farmer crops API error:', error)
      // Return mock crop data
      return [
        { 
          id: 1, 
          name: 'Maize', 
          area: '2.5 acres', 
          plantingDate: '2025-05-15', 
          expectedHarvest: '2025-07-15',
          status: 'Growing',
          progress: 65
        },
        { 
          id: 2, 
          name: 'Beans', 
          area: '1.5 acres', 
          plantingDate: '2024-04-01', 
          expectedHarvest: '2025-06-30',
          status: 'Flowering',
          progress: 45
        }
      ]
    }
  },

  // Add new crop
  addCrop: async (farmerId, cropData) => {
    try {
      const data = await apiCall(`/farmers/${farmerId}/crops`, {
        method: 'POST',
        body: JSON.stringify(cropData)
      })
      return data
    } catch (error) {
      console.error('Add crop API error:', error)
      throw error
    }
  },

  // Update crop status
  updateCrop: async (farmerId, cropId, cropData) => {
    try {
      const data = await apiCall(`/farmers/${farmerId}/crops/${cropId}`, {
        method: 'PUT',
        body: JSON.stringify(cropData)
      })
      return data
    } catch (error) {
      console.error('Update crop API error:', error)
      throw error
    }
  }
}

// Export all services
export default {
  weather: weatherService,
  market: marketService,
  farmer: farmerService,
  tips: tipsService,
  crop: cropService
}
