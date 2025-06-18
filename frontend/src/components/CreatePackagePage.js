import React, { useState } from 'react';

// Main App component for demonstration purposes
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <CreatePackagePage />
    </div>
  );
}

const CreatePackagePage = () => {
  // Define your backend API base URL here.
  // IMPORTANT: Change this to your actual backend API URL (e.g., 'http://localhost:5000' or your deployed URL)
  const API_BASE_URL = 'http://localhost:5000'; // Consistent with AdminDashboard

  const [formData, setFormData] = useState({
    packageName: '',
    location: '',
    duration: '',
    price: '', // Will be parsed to Number
    description: '',
    dates: '',
    vlogLink: '',
    contactName: '',
    contactNumber: '',
    facilities: {
      Hotel: false,
      Guide: false,
      Food: false,
      Activities: false,
      BikeRental: false,
    },
    coverImage: null, // For storing the file object
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox changes for facilities
  const handleFacilityChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      facilities: {
        ...prevData.facilities,
        [name]: checked,
      },
    }));
  };

  // Handle file input change for cover image
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      coverImage: e.target.files[0], // Get the first file selected
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const data = new FormData();
    for (const key in formData) {
      if (key === 'facilities') {
        data.append(key, JSON.stringify(formData[key])); // Stringify JSON objects for FormData
      } else if (key === 'coverImage' && formData[key]) {
        data.append('coverImage', formData[key]); // Append the file
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/packages`, {
        method: 'POST',
        body: data, // FormData is automatically set with 'Content-Type: multipart/form-data'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create package');
      }

      const result = await response.json();
      setSuccessMessage('Travel package created successfully!');
      // Optionally reset form after successful submission
      setFormData({
        packageName: '',
        location: '',
        duration: '',
        price: '',
        description: '',
        dates: '',
        vlogLink: '',
        contactName: '',
        contactNumber: '',
        facilities: {
          Hotel: false,
          Guide: false,
          Food: false,
          Activities: false,
          BikeRental: false,
        },
        coverImage: null,
      });
      // Clear the file input visually after submission
      document.getElementById('coverImage').value = '';

    } catch (err) {
      console.error('Error creating package:', err);
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center border-b pb-4">
          Create New Travel Package
        </h1>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Package Name */}
          <div>
            <label htmlFor="packageName" className="block text-sm font-medium text-gray-700 mb-1">
              Package Name
            </label>
            <input
              type="text"
              id="packageName"
              name="packageName"
              value={formData.packageName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duration (e.g., "7 Days / 6 Nights")
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Dates */}
          <div>
            <label htmlFor="dates" className="block text-sm font-medium text-gray-700 mb-1">
              Available Dates (e.g., "Oct 15 - Oct 22, 2024")
            </label>
            <input
              type="text"
              id="dates"
              name="dates"
              value={formData.dates}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Vlog Link */}
          <div>
            <label htmlFor="vlogLink" className="block text-sm font-medium text-gray-700 mb-1">
              Vlog Link (Optional)
            </label>
            <input
              type="url"
              id="vlogLink"
              name="vlogLink"
              value={formData.vlogLink}
              onChange={handleChange}
              placeholder="e.g., https://youtube.com/watch?v=..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Contact Name */}
          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Person Name
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Description - Spans both columns */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y"
            ></textarea>
          </div>

          {/* Facilities Checkboxes */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Facilities Included</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2">
              {Object.keys(formData.facilities).map((facility) => (
                <div key={facility} className="flex items-center">
                  <input
                    type="checkbox"
                    id={facility}
                    name={facility}
                    checked={formData.facilities[facility]}
                    onChange={handleFacilityChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={facility} className="ml-2 block text-sm text-gray-900">
                    {facility.replace(/([A-Z])/g, ' $1').trim()} {/* Adds space before capitals */}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="md:col-span-2">
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image
            </label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            />
            {formData.coverImage && (
              <p className="mt-2 text-sm text-gray-500">Selected file: {formData.coverImage.name}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Package...
                </>
              ) : (
                'Create Package'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
