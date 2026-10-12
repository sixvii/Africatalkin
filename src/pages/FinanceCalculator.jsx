import { useState } from 'react'
import { FaCalculator, FaMoneyBillWave, FaChartPie, FaSms, FaPercent } from 'react-icons/fa'
import { sendSMS } from '../utils/smsAPI'
import { translateMessage } from '../utils/translations'

function FinanceCalculator() {
  const [activeTab, setActiveTab] = useState('loan')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [language, setLanguage] = useState('en')
  
  // Loan Calculator
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('12')
  const [loanTerm, setLoanTerm] = useState('12')
  
  // ROI Calculator
  const [investment, setInvestment] = useState('')
  const [expectedYield, setExpectedYield] = useState('')
  const [marketPrice, setMarketPrice] = useState('')
  
  // Budget Planner
  const [farmSize, setFarmSize] = useState('')
  const [cropType, setCropType] = useState('maize')

  const calculateLoan = async () => {
    if (!loanAmount || !phoneNumber) return
    
    const principal = parseFloat(loanAmount)
    const rate = parseFloat(interestRate) / 100 / 12
    const term = parseFloat(loanTerm)
    
    const monthlyPayment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1)
    const totalPayment = monthlyPayment * term
    const totalInterest = totalPayment - principal
    
    const message = translateMessage('finance_calc', language, {
      calculation: `Loan: NAIRA ${principal.toLocaleString()}, Monthly: NAIRA ${monthlyPayment.toFixed(0)}, Total Interest: NAIRA ${totalInterest.toFixed(0)}`
    })
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Loan calculation sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  const calculateROI = async () => {
    if (!investment || !expectedYield || !marketPrice || !phoneNumber) return
    
    const investmentCost = parseFloat(investment)
    const yield_kg = parseFloat(expectedYield)
    const price_per_kg = parseFloat(marketPrice)
    
    const revenue = yield_kg * price_per_kg
    const profit = revenue - investmentCost
    const roi = (profit / investmentCost) * 100
    
    const message = translateMessage('finance_calc', language, {
      calculation: `Investment: NAIRA ${investmentCost.toLocaleString()}, Revenue: NAIRA ${revenue.toLocaleString()}, ROI: ${roi.toFixed(1)}%`
    })
    
    try {
      await sendSMS([phoneNumber], message)
      alert('ROI calculation sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  const generateBudget = async () => {
    if (!farmSize || !phoneNumber) return
    
    const size = parseFloat(farmSize)
    const budgets = {
      maize: { seeds: 5000, fertilizer: 8000, labor: 12000, other: 3000 },
      beans: { seeds: 8000, fertilizer: 6000, labor: 10000, other: 2500 },
      potatoes: { seeds: 15000, fertilizer: 10000, labor: 15000, other: 5000 }
    }
    
    const budget = budgets[cropType]
    const totalCost = Object.values(budget).reduce((sum, cost) => sum + (cost * size), 0)
    
    const message = translateMessage('finance_calc', language, {
      calculation: `${cropType.toUpperCase()} Budget (${size} acres): Seeds NAIRA ${(budget.seeds * size).toLocaleString()}, Total: NAIRA ${totalCost.toLocaleString()}`
    })
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Budget sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Agricultural Finance Calculator</h1>
          <p className="text-gray-600">Plan your farm finances with SMS delivery</p>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow-lg shadow-orange-500/20 p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+254700000000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
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
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-lg shadow-orange-500/20">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'loan', label: 'Loan Calculator', icon: FaMoneyBillWave },
                { id: 'roi', label: 'ROI Calculator', icon: FaPercent },
                { id: 'budget', label: 'Budget Planner', icon: FaChartPie }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500'
                  }`}
                >
                  <tab.icon className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Loan Calculator */}
            {activeTab === 'loan' && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (NAIRA)</label>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Term (months)</label>
                    <input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <button
                  onClick={calculateLoan}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
                >
                  <FaSms className="inline mr-2" /> Calculate & Send SMS
                </button>
              </div>
            )}

            {/* ROI Calculator */}
            {activeTab === 'roi' && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Investment Cost (NAIRA)</label>
                    <input
                      type="number"
                      value={investment}
                      onChange={(e) => setInvestment(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Yield (kg)</label>
                    <input
                      type="number"
                      value={expectedYield}
                      onChange={(e) => setExpectedYield(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Market Price (NAIRA/kg)</label>
                    <input
                      type="number"
                      value={marketPrice}
                      onChange={(e) => setMarketPrice(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <button
                  onClick={calculateROI}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
                >
                  <FaSms className="inline mr-2" /> Calculate ROI & Send SMS
                </button>
              </div>
            )}

            {/* Budget Planner */}
            {activeTab === 'budget' && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Farm Size (acres)</label>
                    <input
                      type="number"
                      value={farmSize}
                      onChange={(e) => setFarmSize(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
                    <select
                      value={cropType}
                      onChange={(e) => setCropType(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="maize">Maize</option>
                      <option value="beans">Beans</option>
                      <option value="potatoes">Potatoes</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={generateBudget}
                  className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
                >
                  <FaSms className="inline mr-2" /> Generate Budget & Send SMS
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinanceCalculator
