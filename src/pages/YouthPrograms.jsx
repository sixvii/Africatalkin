import { useState } from 'react'
import { FaGraduationCap, FaUsers, FaRocket, FaSms, FaStar } from 'react-icons/fa'
import { sendSMS } from '../utils/smsAPI'

function YouthPrograms() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [age, setAge] = useState('')
  const [interest, setInterest] = useState('')

  const programs = [
    {
      id: 1,
      title: 'Young Farmers Startup Program',
      description: 'Get funding and mentorship to start your farming business',
      duration: '6 months',
      funding: 'Up to KES 500,000',
      requirements: 'Age 18-35, Basic farming knowledge',
      benefits: ['Seed funding', 'Mentorship', 'Market linkage', 'Training']
    },
    {
      id: 2,
      title: 'Agri-Tech Innovation Challenge',
      description: 'Develop technology solutions for agricultural problems',
      duration: '3 months',
      funding: 'Up to KES 1,000,000',
      requirements: 'Age 18-30, Tech background',
      benefits: ['Innovation grants', 'Tech incubation', 'Investor connections', 'Prototyping support']
    },
    {
      id: 3,
      title: 'Sustainable Farming Certification',
      description: 'Learn modern sustainable farming techniques',
      duration: '4 months',
      funding: 'Scholarship available',
      requirements: 'Age 16-35, Interest in farming',
      benefits: ['Certification', 'Practical training', 'Equipment access', 'Job placement']
    }
  ]

  const successStories = [
    {
      name: 'Grace Wanjiku',
      age: 24,
      location: 'Kiambu',
      story: 'Started with 0.5 acres, now owns 10-acre organic farm',
      achievement: 'KES 2M annual revenue',
      program: 'Young Farmers Startup'
    },
    {
      name: 'David Ochieng',
      age: 27,
      location: 'Kisumu',
      story: 'Developed SMS-based crop monitoring system',
      achievement: '500+ farmers using his app',
      program: 'Agri-Tech Innovation'
    }
  ]

  const applyForProgram = async (program) => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    const message = `YOUTH PROGRAM APPLICATION: ${program.title}. Duration: ${program.duration}. Funding: ${program.funding}. Requirements: ${program.requirements}. Apply now! Reply with your details.`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Program application info sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  const sendSuccessStory = async (story) => {
    if (!phoneNumber) return alert('Please enter phone number')
    
    const message = `SUCCESS STORY: ${story.name} (${story.age}) from ${story.location}. ${story.story}. Achievement: ${story.achievement}. Program: ${story.program}. You can do it too!`
    
    try {
      await sendSMS([phoneNumber], message)
      alert('Success story sent!')
    } catch (error) {
      console.error('SMS failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Youth Farmer Programs</h1>
          <p className="text-gray-600">Empowering the next generation of African farmers</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-lg shadow-orange-500/20 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Get Program Updates</h3>
          <div className="grid md:grid-cols-3 gap-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="18"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interest Area</label>
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select interest...</option>
                <option value="crop-farming">Crop Farming</option>
                <option value="livestock">Livestock</option>
                <option value="agri-tech">Agricultural Technology</option>
                <option value="agribusiness">Agribusiness</option>
              </select>
            </div>
          </div>
        </div>

        {/* Programs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Available Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map(program => (
              <div key={program.id} className="bg-white rounded-lg shadow-lg shadow-orange-500/20 p-6">
                <div className="flex items-center mb-4">
                  <FaRocket className="text-orange-500 text-xl mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">{program.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{program.description}</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <div><span className="font-medium">Duration:</span> {program.duration}</div>
                  <div><span className="font-medium">Funding:</span> {program.funding}</div>
                  <div><span className="font-medium">Requirements:</span> {program.requirements}</div>
                </div>
                
                <div className="mb-4">
                  <span className="font-medium text-sm">Benefits:</span>
                  <ul className="text-sm text-gray-600 mt-1">
                    {program.benefits.map((benefit, index) => (
                      <li key={index}>• {benefit}</li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={() => applyForProgram(program)}
                  className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                >
                  <FaSms className="inline mr-1" /> Get Application Info
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg shadow-orange-500/20 p-6">
                <div className="flex items-center mb-4">
                  <FaStar className="text-yellow-500 text-xl mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{story.name}, {story.age}</h3>
                    <p className="text-gray-600 text-sm">{story.location}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-3">{story.story}</p>
                
                <div className="space-y-1 text-sm mb-4">
                  <div><span className="font-medium">Achievement:</span> {story.achievement}</div>
                  <div><span className="font-medium">Program:</span> {story.program}</div>
                </div>
                
                <button
                  onClick={() => sendSuccessStory(story)}
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                >
                  <FaSms className="inline mr-1" /> Get Inspiration
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default YouthPrograms