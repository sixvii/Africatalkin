// Mock data for the application
export const farmerProfiles = [
  {
    id: 1,
    name: "John Kamau",
    phone: "+234700123456",
    location: "Nakuru, Kenya",
    crops: ["Maize", "Beans", "Potatoes"],
    livestock: ["Cattle", "Chickens"],
    farmSize: "5 acres",
    experience: "10 years"
  },
  {
    id: 2,
    name: "Mary Adeloja",
    phone: "+234701234567",
    location: "Nairobi, Kenya",
    crops: ["Vegetables", "Herbs"],
    livestock: ["Goats"],
    farmSize: "2 acres",
    experience: "5 years"
  }
]

export const marketPrices = {
  crops: [
    { name: "Maize", price: 45, unit: "kg", change: "+5%", market: "Lagos" },
    { name: "Beans", price: 120, unit: "kg", change: "+12%", market: "Abuja" },
    { name: "Potatoes", price: 80, unit: "kg", change: "-3%", market: "Kano" },
    { name: "Tomatoes", price: 60, unit: "kg", change: "+8%", market: "Port Harcourt" },
    { name: "Onions", price: 90, unit: "kg", change: "+15%", market: "Ibadan" }
  ],
  livestock: [
    { name: "Cattle", price: 450000, unit: "head", change: "+2%", market: "Lagos" },
    { name: "Goats", price: 85000, unit: "head", change: "+7%", market: "Abuja" },
    { name: "Chickens", price: 8000, unit: "head", change: "-1%", market: "Kano" }
  ]
}

export const weatherData = {
  current: {
    temperature: 24,
    humidity: 65,
    rainfall: 0,
    windSpeed: 12,
    condition: "Partly Cloudy"
  },
  forecast: [
    { day: "Today", high: 26, low: 18, condition: "Sunny", rainfall: 0 },
    { day: "Tomorrow", high: 24, low: 16, condition: "Cloudy", rainfall: 5 },
    { day: "Wednesday", high: 22, low: 15, condition: "Rainy", rainfall: 25 },
    { day: "Thursday", high: 25, low: 17, condition: "Partly Cloudy", rainfall: 2 }
  ]
}

export const farmingTips = [
  {
    id: 1,
    category: "Planting",
    title: "Optimal Maize Planting Time",
    content: "Plant maize at the beginning of the rainy season for best yields. Ensure soil temperature is above 10°C.",
    smsContent: "FARMING TIP: Plant maize now! Rainy season starting. Soil temp above 10°C ideal. Good luck!"
  },
  {
    id: 2,
    category: "Pest Control",
    title: "Fall Armyworm Prevention",
    content: "Monitor crops daily for fall armyworm. Early detection and treatment are crucial for crop protection.",
    smsContent: "PEST ALERT: Check crops daily for fall armyworm. Early treatment saves your harvest. Act fast!"
  },
  {
    id: 3,
    category: "Irrigation",
    title: "Water Management",
    content: "Water crops early morning or late evening to reduce evaporation and maximize water efficiency.",
    smsContent: "WATER TIP: Irrigate early morning or evening. Saves water, better for plants. Smart farming!"
  }
]
