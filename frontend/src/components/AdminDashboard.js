import React, { useState, useEffect } from 'react';

// Main App component which will render the AdminDashboard
export default function App() {
  // This App component is a placeholder for demonstration.
  // In your actual App.js, you would pass admin details as props to AdminDashboard
  // based on the logged-in user.
  const mockAdminDetails = {
    name: 'Dynamic Admin',
    title: 'Super Administrator',
    photo: 'https://placehold.co/150x150/66BB6A/FFFFFF?text=DYN', // Dynamic Placeholder
    phone: '+1 (111) 222-3333',
    email: 'dynamic.admin@travelco.com',
    address: '456 Admin Ave, Control City, 10111',
    bio: 'Overseeing all operations with a keen eye for efficiency and a commitment to user satisfaction. Always ready to optimize and improve the travel experience.',
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <AdminDashboard adminDetails={mockAdminDetails} />
    </div>
  );
}

// AdminDashboard component now accepts 'adminDetails' as a prop
const AdminDashboard = ({ adminDetails }) => {
  // Define your backend API base URL here.
  // IMPORTANT: Change this to your actual backend API URL (e.g., 'http://localhost:5000' or your deployed URL)
  const API_BASE_URL = 'http://localhost:5000'; // Placeholder URL

  // State for dashboard statistics, some will be updated from fetched data
  const [dashboardStats, setDashboardStats] = useState({
    totalPackages: 0, // This will be updated based on fetched data
    successfulOrders: 850, // Mock data, as this is not from packageRoutes.js
    overallAdminRating: 4.8, // Mock data, as this is not from packageRoutes.js
  });

  // State for travel packages fetched from the backend
  const [travelPackages, setTravelPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch travel packages from the backend on component mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Use the absolute URL for the fetch request
        const response = await fetch(`${API_BASE_URL}/api/packages`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Map backend data to flatten for display and include all relevant fields
        const mappedPackages = data.map(pkg => ({
          id: pkg._id,
          packageName: pkg.packageName,
          location: pkg.location,
          duration: pkg.duration,
          price: pkg.price,
          description: pkg.description,
          dates: pkg.dates,
          vlogLink: pkg.vlogLink,
          contactName: pkg.contactName,
          contactNumber: pkg.contactNumber,
          coverImageUrl: pkg.coverImageUrl,
          facilities: pkg.facilities // The facilities object
        }));

        setTravelPackages(mappedPackages);
        setDashboardStats(prevStats => ({
          ...prevStats,
          totalPackages: mappedPackages.length, // Update total packages count
        }));
      } catch (err) {
        console.error('Error fetching packages:', err);
        setError('Failed to load packages. Please ensure your backend is running and the API_BASE_URL is correct. Error details: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [API_BASE_URL]); // Added API_BASE_URL to dependency array as it's used inside
  // Helper function to summarize facilities for display
  const getFacilitiesSummary = (facilities) => {
    if (!facilities) return 'N/A';
    const enabledFacilities = Object.keys(facilities).filter(key => facilities[key]);
    return enabledFacilities.length > 0 ? enabledFacilities.join(', ') : 'None';
  };

  // Handler for updating a package (placeholder for future API integration)
  const handleUpdatePackage = (packageId) => {
    console.log(`Attempting to update package with ID: ${packageId}. In a real application, this would open a form/modal to edit details and make an API call.`);
    // Example: You would typically navigate to an edit page or open a modal
  };

  // Handler for deleting a package (placeholder for future API integration)
  const handleDeletePackage = (packageId) => {
    console.log(`Attempting to delete package with ID: ${packageId}. In a real application, this would trigger an API call to delete and then update state.`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 bg-gray-100">
      {/* Admin Profile Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 md:p-8 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        <div className="flex-shrink-0">
          <img
            src={adminDetails.photo}
            alt="Admin Profile"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-md"
          />
        </div>
        <div className="text-center md:text-left flex-grow">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Welcome, {adminDetails.name}!</h1>
          <p className="text-lg md:text-xl font-medium opacity-90">{adminDetails.title}</p>
          <p className="text-sm md:text-base mt-3 max-w-2xl mx-auto md:mx-0 opacity-80">{adminDetails.bio}</p>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2 mt-4 text-sm md:text-base">
            <p className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
              </svg>
              {adminDetails.phone}
            </p>
            <p className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              {adminDetails.email}
            </p>
            <p className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
              </svg>
              {adminDetails.address}
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Statistics */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Total Packages</h3>
          <p className="text-4xl font-bold text-gray-900">{dashboardStats.totalPackages}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-purple-600 mb-2">Successful Orders</h3>
          <p className="text-4xl font-bold text-gray-900">{dashboardStats.successfulOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-orange-600 mb-2">Admin Rating</h3>
          <p className="text-4xl font-bold text-gray-900 flex items-center justify-center">
            {dashboardStats.overallAdminRating}
            <svg className="w-8 h-8 text-yellow-400 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.725c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
            </svg>
          </p>
        </div>
      </section>

      {/* Travel Packages Management */}
      <section className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b pb-4">Manage Travel Packages</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Person
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact No.
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Facilities
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-md">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {travelPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {pkg.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {pkg.packageName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {pkg.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {pkg.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    ${pkg.price} {/* Display price with currency symbol */}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 max-w-xs overflow-hidden text-ellipsis">
                    {pkg.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {pkg.dates}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {pkg.contactName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {pkg.contactNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {getFacilitiesSummary(pkg.facilities)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => handleUpdatePackage(pkg.id)}
                      className="text-blue-600 hover:text-blue-900 mr-4 p-2 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                      title="Update Package"
                    >
                      <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      <span className="sr-only">Update</span>
                    </button>
                    <button
                      onClick={() => handleDeletePackage(pkg.id)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                      title="Delete Package"
                    >
                      <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      <span className="sr-only">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
