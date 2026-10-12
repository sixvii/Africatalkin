import { FaSms, FaUsers, FaChartLine, FaLeaf, FaGraduationCap } from 'react-icons/fa'
import { GiCow } from 'react-icons/gi'
import { Link } from 'react-router-dom'

function Home() {
  const focusAreas = [
    { icon: FaLeaf, title: "Farming Efficiency", desc: "Smart tools and SMS alerts for optimal farming" },
    { icon: FaChartLine, title: "Market Access", desc: "Real-time market prices via SMS notifications" },
    { icon: FaLeaf, title: "Sustainable Agriculture", desc: "Eco-friendly practices delivered to your phone" },
    { icon: FaChartLine, title: "Agri-Data Analytics", desc: "Data insights and reports via SMS" },
    { icon: GiCow, title: "Crop & Livestock", desc: "Health alerts and management via SMS" },
    { icon: FaGraduationCap, title: "Education & Extension", desc: "Learning content delivered via SMS" }
  ]

  const targetAudience = [
    "Software Developers", "Farmers & Agriculture Experts", "Data Scientists",
    "Agriculture Engineers", "IoT Specialists", "Agricultural Entrepreneurs"
  ]

  return (
    <div className="bg-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-20 px-2 sm:px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6 px-2 transition-colors duration-300">
            Revolutionizing African Agriculture with <span className="text-amber-500">Africa's</span><span className="text-emerald-800">Talking</span> SMS Technology
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-4 sm:mb-6 lg:mb-8 max-w-3xl mx-auto px-2 transition-colors duration-300">
            Connecting farmers, experts, and technology through Africa's Talking SMS API to solve agricultural challenges across the continent.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <Link to="/sms-center" className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 lg:px-8 py-3 transition-all duration-300 hover-lift flex items-center justify-center transform hover:scale-105 text-sm sm:text-base" style={{borderRadius: '2px'}}>
              <FaSms className="mr-2 transition-transform duration-200" /> Try SMS Center
            </Link>
            <Link to="/farmer-dashboard" className="border-2 border-orange-500 text-orange-500 hover:text-orange-600 hover:border-orange-600 px-4 sm:px-6 lg:px-8 py-3 hover:bg-orange-50 transition-all duration-300 hover-lift transform hover:scale-105 text-sm sm:text-base" style={{borderRadius: '2px'}}>
              Farmer Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-8 sm:py-12 lg:py-16 px-2 sm:px-4 bg-gray-50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8 lg:mb-12 transition-colors duration-300">Key Focus Areas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {focusAreas.map((area, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 hover-lift animate-slideUp" style={{borderRadius: '2px', animationDelay: `${index * 0.1}s`}}>
                <area.icon className="text-xl sm:text-2xl lg:text-3xl text-orange-500 mb-2 sm:mb-3 lg:mb-4 transition-transform duration-200 hover:scale-110" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 transition-colors duration-300">{area.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 transition-colors duration-300">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-8 sm:py-12 lg:py-16 px-2 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8 lg:mb-12 transition-colors duration-300">Built For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {targetAudience.map((audience, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 shadow-lg text-center border border-orange-100 hover:border-orange-300 transition-all duration-300 hover-lift animate-fadeIn" style={{borderRadius: '2px', animationDelay: `${index * 0.1}s`}}>
                <FaUsers className="text-lg sm:text-xl lg:text-2xl text-orange-500 mx-auto mb-2 sm:mb-3 transition-transform duration-200 hover:scale-110" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 transition-colors duration-300">{audience}</h3>
                <p className="text-sm sm:text-base text-gray-600 transition-colors duration-300">Professional expertise in agricultural technology</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SMS Demo Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-2 sm:px-4 bg-orange-50 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8 transition-colors duration-300">Experience SMS-Powered Agriculture</h2>
          <div className="bg-white p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200 transition-colors duration-300" style={{borderRadius: '2px'}}>
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <FaSms className="text-2xl sm:text-3xl lg:text-4xl text-orange-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 transition-colors duration-300">Live SMS Integration</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 transition-colors duration-300">
              Powered by Africa's Talking API - Send bulk messages, receive alerts, and connect farmers with real-time information.
            </p>
            <Link to="/sms-center" className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-3 hover:shadow-lg transition-all duration-300 text-sm sm:text-base" style={{borderRadius: '2px'}}>
              Explore SMS Features
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
