import { useState } from 'react'
import { FaMoneyBillWave, FaCalculator, FaChartPie, FaPercent, FaSms, FaCreditCard, FaPiggyBank, FaHandHoldingUsd, FaChartLine, FaFileInvoiceDollar } from 'react-icons/fa'
import { sendSMS } from '../utils/smsAPI'

function Finance() {
  const [activeTab, setActiveTab] = useState('overview')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)

  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')

  // Budget Planner State
  const [farmSize, setFarmSize] = useState('')
  const [cropType, setCropType] = useState('maize')
  const [season, setSeason] = useState('wet')

  // Investment Calculator State
  const [investmentAmount, setInvestmentAmount] = useState('')
  const [expectedReturn, setExpectedReturn] = useState('')
  const [investmentPeriod, setInvestmentPeriod] = useState('')

  const financeServices = [
    { icon: FaMoneyBillWave, title: "Micro Loans", desc: "Quick agricultural loans for farmers", amount: "₦50K - ₦500K" },
    { icon: FaPiggyBank, title: "Savings Plans", desc: "Seasonal savings for farm equipment", rate: "8% Annual" },
    { icon: FaCreditCard, title: "Farm Credit", desc: "Equipment financing solutions", term: "6-24 months" },
    { icon: FaHandHoldingUsd, title: "Crop Insurance", desc: "Protect your harvest investment", coverage: "Up to 80%" }
  ]

  const calculateLoan = async () => {
    if (!loanAmount || !interestRate || !loanTerm || !phoneNumber) {
      alert('Please fill all loan fields and phone number')
      return
    }

    setLoading(true)
    const principal = parseFloat(loanAmount)
    const rate = parseFloat(interestRate) / 100 / 12
    const term = parseFloat(loanTerm) * 12

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1)
    const totalPayment = monthlyPayment * term
    const totalInterest = totalPayment - principal

    const message = `LOAN CALCULATION: Amount: ₦${principal.toLocaleString()}, Monthly Payment: ₦${monthlyPayment.toFixed(2)}, Total Interest: ₦${totalInterest.toFixed(2)}, Total Payment: ₦${totalPayment.toFixed(2)}`

    try {
      await sendSMS([phoneNumber], message)
      alert('Loan calculation sent to your phone!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  const generateBudget = async () => {
    if (!farmSize || !phoneNumber) {
      alert('Please fill farm size and phone number')
      return
    }

    setLoading(true)
    const size = parseFloat(farmSize)
    const budgets = {
      maize: { seeds: 5000, fertilizer: 8000, labor: 12000, other: 3000 },
      beans: { seeds: 8000, fertilizer: 6000, labor: 10000, other: 2500 },
      rice: { seeds: 12000, fertilizer: 15000, labor: 18000, other: 4000 },
      cassava: { seeds: 3000, fertilizer: 4000, labor: 8000, other: 2000 }
    }

    const budget = budgets[cropType]
    const totalCost = Object.values(budget).reduce((sum, cost) => sum + (cost * size), 0)
    const expectedRevenue = totalCost * 1.4 // 40% profit margin
    const profit = expectedRevenue - totalCost

    const message = `FARM BUDGET (${size} acres ${cropType}): Total Cost: ₦${totalCost.toLocaleString()}, Expected Revenue: ₦${expectedRevenue.toLocaleString()}, Profit: ₦${profit.toLocaleString()}`

    try {
      await sendSMS([phoneNumber], message)
      alert('Budget plan sent to your phone!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
    setLoading(false)
  }

  const calculateInvestment = async () => {
    if (!investmentAmount || !expectedReturn || !investmentPeriod || !phoneNumber) {
      alert('Please fill all investment fields and phone number')
      return
    }

    setLoading(true)
    const principal = parseFloat(investmentAmount)
    const rate = parseFloat(expectedReturn) / 100
    const years = parseFloat(investmentPeriod)

    const futureValue = principal * Math.pow(1 + rate, years)
    const totalReturn = futureValue - principal

    const message = `INVESTMENT PROJECTION: Initial: ₦${principal.toLocaleString()}, After ${years} years: ₦${futureValue.toFixed(2)}, Total Return: ₦${totalReturn.toFixed(2)} (${expectedReturn}% annual)`

    try {
      await sendSMS([phoneNumber], message)
      alert('Investment projection sent to your phone!')
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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Finance Center</h1>
          <p className="text-sm sm:text-base text-gray-600 px-2">Agricultural finance solutions and calculators</p>
        </div>

        {/* Phone Number Input */}
        <div className="bg-white shadow-lg shadow-orange-500/20 p-4 sm:p-6 mb-6 sm:mb-8" style={{borderRadius: '2px'}}>
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number for SMS Reports</label>
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

        {/* Finance Services Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {financeServices.map((service, index) => (
            <div key={index} className="bg-white p-4 sm:p-6 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 hover-lift animate-slideUp" style={{borderRadius: '2px', animationDelay: `${index * 0.1}s`}}>
              <service.icon className="text-2xl sm:text-3xl text-orange-500 mb-3 sm:mb-4" />
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">{service.desc}</p>
              <div className="text-xs sm:text-sm font-medium text-orange-600">
                {service.amount || service.rate || service.term || service.coverage}
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white shadow-lg shadow-orange-500/20 mb-6 sm:mb-8" style={{borderRadius: '2px'}}>
          <div className="border-b border-gray-200">
            <nav className="flex space-x-2 sm:space-x-4 lg:space-x-8 px-2 sm:px-4 lg:px-6 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: FaChartLine },
                { id: 'loan', label: 'Loan Calculator', icon: FaMoneyBillWave },
                { id: 'budget', label: 'Budget Planner', icon: FaChartPie },
                { id: 'investment', label: 'Investment', icon: FaPercent }
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
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Financial Services Dashboard</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-orange-50 border border-orange-200 p-4 sm:p-6" style={{borderRadius: '2px'}}>
                    <h4 className="font-medium text-orange-800 mb-3 flex items-center">
                      <FaFileInvoiceDollar className="mr-2" />
                      Quick Stats
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-orange-700">Available Loans:</span>
                        <span className="text-orange-600 font-medium">₦2.5M+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-700">Interest Rate:</span>
                        <span className="text-orange-600 font-medium">8-15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-700">Processing Time:</span>
                        <span className="text-orange-600 font-medium">24-48 hrs</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-4 sm:p-6" style={{borderRadius: '2px'}}>
                    <h4 className="font-medium text-green-800 mb-3 flex items-center">
                      <FaPiggyBank className="mr-2" />
                      Savings Options
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-700">Minimum Deposit:</span>
                        <span className="text-green-600 font-medium">₦5,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Annual Return:</span>
                        <span className="text-green-600 font-medium">8-12%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Withdrawal:</span>
                        <span className="text-green-600 font-medium">Flexible</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loan Calculator Tab */}
            {activeTab === 'loan' && (
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Agricultural Loan Calculator</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₦)</label>
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        placeholder="100000"
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
                        style={{borderRadius: '2px'}}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                      <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="12"
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
                        style={{borderRadius: '2px'}}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (Years)</label>
                      <input
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        placeholder="2"
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
                        style={{borderRadius: '2px'}}
                      />
                    </div>
                    <button
                      onClick={calculateLoan}
                      disabled={loading || !phoneNumber}
                      className="w-full bg-orange-500 text-white py-3 hover:bg-orange-600 transition disabled:opacity-50 flex items-center justify-center"
                      style={{borderRadius: '2px'}}
                    >
                      <FaSms className="mr-2" />
                      {loading ? 'Calculating...' : 'Calculate & Send SMS'}
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 p-4 sm:p-6" style={{borderRadius: '2px'}}>
                    <h4 className="font-medium text-gray-800 mb-3">Loan Information</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Agricultural loans from ₦50,000 to ₦500,000</p>
                      <p>• Interest rates: 8% - 15% annually</p>
                      <p>• Flexible repayment terms</p>
                      <p>• Quick approval process</p>
                      <p>• Collateral may be required</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Budget Planner Tab */}
            {activeTab === 'budget' && (
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Farm Budget Planner</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Farm Size (Acres)</label>
                      <input
                        type="number"
                        value={farmSize}
                        onChange={(e) => setFarmSize(e.target.value)}
                        placeholder="5"
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
                        style={{borderRadius: '2px'}}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
                      <select
                        value={cropType}
                        onChange={(e) => setCropType(e.target.value)}
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
                        style={{borderRadius: '2px'}}
                      >
                        <option value="maize">Maize</option>
                        <option value="beans">Beans</option>
                        <option value="rice">Rice</option>
                        <option value="cassava">Cassava</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
                      <select
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
                        style={{borderRadius: '2px'}}
                      >
                        <option value="wet">Wet Season</option>
                        <option value="dry">Dry Season</option>
                      </select>
                    </div>
                    <button
                      onClick={generateBudget}
                      disabled={loading || !phoneNumber}
                      className="w-full bg-orange-500 text-white py-3 hover:bg-orange-600 transition disabled:opacity-50 flex items-center justify-center"
                      style={{borderRadius: '2px'}}
                    >
                      <FaSms className="mr-2" />
                      {loading ? 'Generating...' : 'Generate Budget & Send SMS'}
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 p-4 sm:p-6" style={{borderRadius: '2px'}}>
                    <h4 className="font-medium text-gray-800 mb-3">Budget Components</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Seeds and planting materials</p>
                      <p>• Fertilizers and chemicals</p>
                      <p>• Labor costs</p>
                      <p>• Equipment and tools</p>
                      <p>• Transportation</p>
                      <p>• Expected revenue projection</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Investment Calculator Tab */}
            {activeTab === 'investment' && (
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Investment Calculator</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount (₦)</label>
                      <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        placeholder="50000"
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
                        style={{borderRadius: '2px'}}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expected Return (%)</label>
                      <input
                        type="number"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(e.target.value)}
                        placeholder="15"
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
                        style={{borderRadius: '2px'}}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                      <input
                        type="number"
                        value={investmentPeriod}
                        onChange={(e) => setInvestmentPeriod(e.target.value)}
                        placeholder="3"
                        className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-orange-500"
                        style={{borderRadius: '2px'}}
                      />
                    </div>
                    <button
                      onClick={calculateInvestment}
                      disabled={loading || !phoneNumber}
                      className="w-full bg-orange-500 text-white py-3 hover:bg-orange-600 transition disabled:opacity-50 flex items-center justify-center"
                      style={{borderRadius: '2px'}}
                    >
                      <FaSms className="mr-2" />
                      {loading ? 'Calculating...' : 'Calculate & Send SMS'}
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 p-4 sm:p-6" style={{borderRadius: '2px'}}>
                    <h4 className="font-medium text-gray-800 mb-3">Investment Options</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Farm equipment purchase</p>
                      <p>• Livestock investment</p>
                      <p>• Land acquisition</p>
                      <p>• Processing equipment</p>
                      <p>• Storage facilities</p>
                      <p>• Irrigation systems</p>
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

export default Finance
