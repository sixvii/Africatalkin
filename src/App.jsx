import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import FarmingHub from './pages/FarmingHub'
import Livestock from './pages/Livestock'
import MarketInfo from './pages/MarketInfo'
import SMSCenter from './pages/SMSCenter'
import Weather from './pages/Weather'
import Finance from './pages/Finance'
import FarmerGroups from './pages/FarmerGroups'
import Sustainability from './pages/Sustainability'
import Education from './pages/Education'
import ClimateAdaptation from './pages/ClimateAdaptation'
import FarmerDashboard from './pages/FarmerDashboard'
import ExpertPanel from './pages/ExpertPanel'
import PestControl from './pages/PestControl'
import './App.css'

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-white flex">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className={`flex-1 transition-all duration-300 ${
          isCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <main className="p-2 sm:p-4 lg:p-8 pt-20 lg:pt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/farming-hub" element={<FarmingHub />} />
              <Route path="/livestock" element={<Livestock />} />
              <Route path="/market-info" element={<MarketInfo />} />
              <Route path="/sms-center" element={<SMSCenter />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/farmer-groups" element={<FarmerGroups />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/education" element={<Education />} />
              <Route path="/climate-adaptation" element={<ClimateAdaptation />} />
              <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
              <Route path="/expert-panel" element={<ExpertPanel />} />
              <Route path="/pest-control" element={<PestControl />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
