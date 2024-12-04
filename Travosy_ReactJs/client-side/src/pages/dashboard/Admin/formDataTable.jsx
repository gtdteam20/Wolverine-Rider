import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar"; // Adjust the path as needed
import Sidebar from "../Sidebar";

const FormDataTable = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3030/form/data");
      console.log("Fetched data:", response.data); // Log to verify the data
      setFormData(response.data.data || []); // Ensure data is set to state
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Poll for new data every 5 seconds
  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 5000); // Polling interval
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = formData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Navbar */}
        <Navbar />

        <div className="container mt-6">
          <h2 className="text-3xl font-semibold mb-4">Form Data</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse bg-white dark:bg-slate-900 rounded-lg shadow-lg">
                <thead className="bg-gray-100 dark:bg-slate-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 dark:text-slate-200">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 dark:text-slate-200">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 dark:text-slate-200">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 dark:text-slate-200">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 dark:text-slate-200">
                      People
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 dark:text-slate-200">
                      Departure Month
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 dark:text-slate-200">
                      Inquiry Page
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No data available
                      </td>
                    </tr>
                  ) : (
                    currentRows.map((entry) => (
                      <tr
                        key={entry._id}
                        className="border-t border-gray-200 dark:border-slate-700"
                      >
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-slate-200">
                          {entry.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-slate-200">
                          {entry.countryCode} {entry.phone}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-slate-200">
                          {entry.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-slate-200">
                          {entry.subject}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-slate-200">
                          {entry.number}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-slate-200">
                          {entry.departureMonth}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-slate-200">
                          {entry.inquiryPage}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="mt-4 flex justify-center">
                <ul className="inline-flex items-center">
                  {Array.from(
                    { length: Math.ceil(formData.length / rowsPerPage) },
                    (_, i) => (
                      <li
                        key={i + 1}
                        className={`px-4 py-2 mx-1 cursor-pointer ${
                          currentPage === i + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormDataTable;
