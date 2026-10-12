import { useState } from 'react'
import { FaUser, FaPhone, FaMapMarkerAlt, FaPlus, FaEdit, FaTrash, FaSearch, FaUsers, FaDownload, FaUpload } from 'react-icons/fa'

function ContactManager({ contacts = [], onSave, onDelete, onImport, onExport }) {
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedContacts, setSelectedContacts] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    category: 'farmer',
    crops: '',
    livestock: '',
    notes: ''
  })

  const categories = [
    { value: 'farmer', label: 'Farmer' },
    { value: 'expert', label: 'Agricultural Expert' },
    { value: 'supplier', label: 'Supplier' },
    { value: 'buyer', label: 'Buyer' },
    { value: 'group', label: 'Farmer Group' },
    { value: 'extension', label: 'Extension Officer' }
  ]

  const defaultContacts = [
    {
      id: 1,
      name: 'John Kamau',
      phone: '+254712345678',
      location: 'Kiambu County',
      category: 'farmer',
      crops: 'Maize, Beans',
      livestock: 'Dairy Cattle',
      notes: 'Organic farming enthusiast'
    },
    {
      id: 2,
      name: 'Mary Wanjiku',
      phone: '+254723456789',
      location: 'Nakuru County',
      category: 'expert',
      crops: 'All crops',
      livestock: 'All livestock',
      notes: 'Veterinary specialist'
    },
    {
      id: 3,
      name: 'Peter Ochieng',
      phone: '+254734567890',
      location: 'Kisumu County',
      category: 'farmer',
      crops: 'Rice, Sugarcane',
      livestock: 'Fish farming',
      notes: 'Aquaculture specialist'
    },
    {
      id: 4,
      name: 'Grace Mutua',
      phone: '+254745678901',
      location: 'Machakos County',
      category: 'group',
      crops: 'Vegetables',
      livestock: 'Poultry',
      notes: 'Women farmers group leader'
    }
  ]

  const allContacts = [...defaultContacts, ...contacts]

  const filteredContacts = allContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.includes(searchTerm) ||
                         contact.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || contact.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSave = () => {
    if (!formData.name || !formData.phone) return

    const contact = {
      id: editingId || Date.now(),
      ...formData
    }

    onSave(contact)
    resetForm()
  }

  const handleEdit = (contact) => {
    setFormData(contact)
    setEditingId(contact.id)
    setIsCreating(true)
  }

  const handleDelete = (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      onDelete(contactId)
      setSelectedContacts(selectedContacts.filter(id => id !== contactId))
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      location: '',
      category: 'farmer',
      crops: '',
      livestock: '',
      notes: ''
    })
    setIsCreating(false)
    setEditingId(null)
  }

  const handleSelectContact = (contactId) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    )
  }

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(filteredContacts.map(contact => contact.id))
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      farmer: 'bg-green-100 text-green-700',
      expert: 'bg-blue-100 text-blue-700',
      supplier: 'bg-purple-100 text-purple-700',
      buyer: 'bg-orange-100 text-orange-700',
      group: 'bg-pink-100 text-pink-700',
      extension: 'bg-yellow-100 text-yellow-700'
    }
    return colors[category] || colors.farmer
  }

  const handleImportCSV = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const csv = e.target.result
        const lines = csv.split('\n')
        const headers = lines[0].split(',')
        
        const importedContacts = lines.slice(1).map((line, index) => {
          const values = line.split(',')
          return {
            id: Date.now() + index,
            name: values[0] || '',
            phone: values[1] || '',
            location: values[2] || '',
            category: values[3] || 'farmer',
            crops: values[4] || '',
            livestock: values[5] || '',
            notes: values[6] || ''
          }
        }).filter(contact => contact.name && contact.phone)
        
        onImport(importedContacts)
      }
      reader.readAsText(file)
    }
  }

  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Phone', 'Location', 'Category', 'Crops', 'Livestock', 'Notes'],
      ...allContacts.map(contact => [
        contact.name,
        contact.phone,
        contact.location,
        contact.category,
        contact.crops,
        contact.livestock,
        contact.notes
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'contacts.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <h3 className="text-lg font-semibold text-gray-800">Contact Manager</h3>
        <div className="flex space-x-2">
          <label className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer flex items-center">
            <FaUpload className="mr-2" />
            Import CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              className="hidden"
            />
          </label>
          <button
            onClick={exportToCSV}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center"
          >
            <FaDownload className="mr-2" />
            Export CSV
          </button>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Contact
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedContacts.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-orange-700">
              {selectedContacts.length} contact(s) selected
            </span>
            <div className="space-x-2">
              <button
                onClick={() => setSelectedContacts([])}
                className="text-orange-600 hover:text-orange-800"
              >
                Clear Selection
              </button>
              <button
                onClick={() => {
                  const selectedPhones = allContacts
                    .filter(contact => selectedContacts.includes(contact.id))
                    .map(contact => contact.phone)
                  navigator.clipboard.writeText(selectedPhones.join(', '))
                  alert('Phone numbers copied to clipboard!')
                }}
                className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600"
              >
                Copy Phone Numbers
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium text-gray-800">
              {editingId ? 'Edit Contact' : 'Add New Contact'}
            </h4>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+254700000000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Crops</label>
              <input
                type="text"
                value={formData.crops}
                onChange={(e) => setFormData({ ...formData, crops: e.target.value })}
                placeholder="e.g., Maize, Beans"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Livestock</label>
              <input
                type="text"
                value={formData.livestock}
                onChange={(e) => setFormData({ ...formData, livestock: e.target.value })}
                placeholder="e.g., Dairy Cattle, Poultry"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Save Contact
            </button>
          </div>
        </div>
      )}

      {/* Contacts List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
              onChange={handleSelectAll}
              className="mr-3"
            />
            <span className="text-sm text-gray-600">
              {filteredContacts.length} contact(s) found
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredContacts.map(contact => (
            <div key={contact.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedContacts.includes(contact.id)}
                  onChange={() => handleSelectContact(contact.id)}
                  className="mr-3"
                />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <FaUser className="text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{contact.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <FaPhone className="mr-1" />
                            {contact.phone}
                          </span>
                          {contact.location && (
                            <span className="flex items-center">
                              <FaMapMarkerAlt className="mr-1" />
                              {contact.location}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(contact.category)}`}>
                        {categories.find(cat => cat.value === contact.category)?.label}
                      </span>
                      <button
                        onClick={() => handleEdit(contact)}
                        className="p-1 text-gray-500 hover:text-orange-600"
                      >
                        <FaEdit />
                      </button>
                      {contact.id > 4 && ( // Only allow deletion of custom contacts
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="p-1 text-gray-500 hover:text-red-600"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {(contact.crops || contact.livestock || contact.notes) && (
                    <div className="mt-2 text-sm text-gray-600">
                      {contact.crops && <div><strong>Crops:</strong> {contact.crops}</div>}
                      {contact.livestock && <div><strong>Livestock:</strong> {contact.livestock}</div>}
                      {contact.notes && <div><strong>Notes:</strong> {contact.notes}</div>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactManager