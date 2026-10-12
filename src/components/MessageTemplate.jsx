import { useState } from 'react'
import { FaEdit, FaTrash, FaCopy, FaSms, FaPlus, FaSave, FaTimes } from 'react-icons/fa'

function MessageTemplate({ templates = [], onSave, onDelete, onUse }) {
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    variables: []
  })

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'weather', label: 'Weather' },
    { value: 'market', label: 'Market' },
    { value: 'farming', label: 'Farming Tips' },
    { value: 'livestock', label: 'Livestock' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' }
  ]

  const defaultTemplates = [
    {
      id: 1,
      title: 'Weather Alert',
      content: 'Weather Update: {weather_condition} expected in your area. {advice}. Stay safe!',
      category: 'weather',
      variables: ['weather_condition', 'advice']
    },
    {
      id: 2,
      title: 'Market Price Update',
      content: 'Market Update: {crop} price - KES {price}/kg. Best selling locations: {locations}.',
      category: 'market',
      variables: ['crop', 'price', 'locations']
    },
    {
      id: 3,
      title: 'Farming Tip',
      content: 'Farming Tip: {tip}. For more information, contact us.',
      category: 'farming',
      variables: ['tip']
    },
    {
      id: 4,
      title: 'Livestock Health',
      content: 'Livestock Alert: {animal_type} - {health_issue}. Recommended action: {action}.',
      category: 'livestock',
      variables: ['animal_type', 'health_issue', 'action']
    },
    {
      id: 5,
      title: 'Finance Reminder',
      content: 'Finance Reminder: {reminder_type} due on {date}. Amount: KES {amount}.',
      category: 'finance',
      variables: ['reminder_type', 'date', 'amount']
    }
  ]

  const allTemplates = [...defaultTemplates, ...templates]

  const handleSave = () => {
    if (!formData.title || !formData.content) return

    const template = {
      id: editingId || Date.now(),
      ...formData,
      variables: extractVariables(formData.content)
    }

    onSave(template)
    resetForm()
  }

  const handleEdit = (template) => {
    setFormData(template)
    setEditingId(template.id)
    setIsCreating(true)
  }

  const handleDelete = (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      onDelete(templateId)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'general',
      variables: []
    })
    setIsCreating(false)
    setEditingId(null)
  }

  const extractVariables = (content) => {
    const matches = content.match(/\{([^}]+)\}/g)
    return matches ? matches.map(match => match.slice(1, -1)) : []
  }

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content)
    alert('Template copied to clipboard!')
  }

  const getCategoryColor = (category) => {
    const colors = {
      general: 'bg-gray-100 text-gray-700',
      weather: 'bg-blue-100 text-blue-700',
      market: 'bg-green-100 text-green-700',
      farming: 'bg-orange-100 text-orange-700',
      livestock: 'bg-purple-100 text-purple-700',
      finance: 'bg-yellow-100 text-yellow-700',
      education: 'bg-pink-100 text-pink-700'
    }
    return colors[category] || colors.general
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Message Templates</h3>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition flex items-center"
        >
          <FaPlus className="mr-2" />
          New Template
        </button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium text-gray-800">
              {editingId ? 'Edit Template' : 'Create New Template'}
            </h4>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Template title"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Use {variable_name} for dynamic content"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use curly braces for variables: {'{variable_name}'}
              </p>
            </div>

            {formData.content && extractVariables(formData.content).length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Variables Found:</label>
                <div className="flex flex-wrap gap-2">
                  {extractVariables(formData.content).map((variable, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                    >
                      {variable}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center"
              >
                <FaSave className="mr-2" />
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Templates List */}
      <div className="grid md:grid-cols-2 gap-4">
        {allTemplates.map(template => (
          <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 mb-1">{template.title}</h4>
                <span className={`inline-block px-2 py-1 rounded text-xs ${getCategoryColor(template.category)}`}>
                  {categories.find(cat => cat.value === template.category)?.label || template.category}
                </span>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => copyToClipboard(template.content)}
                  className="p-1 text-gray-500 hover:text-blue-600"
                  title="Copy to clipboard"
                >
                  <FaCopy />
                </button>
                <button
                  onClick={() => handleEdit(template)}
                  className="p-1 text-gray-500 hover:text-orange-600"
                  title="Edit template"
                >
                  <FaEdit />
                </button>
                {template.id > 5 && ( // Only allow deletion of custom templates
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="p-1 text-gray-500 hover:text-red-600"
                    title="Delete template"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-3 overflow-hidden" style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}>{template.content}</p>

            {template.variables && template.variables.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Variables:</p>
                <div className="flex flex-wrap gap-1">
                  {template.variables.map((variable, index) => (
                    <span
                      key={index}
                      className="px-1 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      {variable}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => onUse && onUse(template)}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition flex items-center justify-center"
            >
              <FaSms className="mr-2" />
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MessageTemplate
