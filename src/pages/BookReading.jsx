import React, { useState, useEffect } from 'react';
import { fetchTrackerData } from '../utils/bookHandlers';

const BookReading = () => {
  const [books, setBooks] = useState([]);
  const [weeklyLogs, setWeeklyLogs] = useState({});
  const [weekHeaders, setWeekHeaders] = useState([]);
//   TODO: Get loading state from Context API
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTrackerData(); // Call the handler
        setBooks(data.books);
        setWeeklyLogs(data.weeklyLogs);
        setWeekHeaders(data.weekHeaders);
      } catch (error) {
        console.error("Failed to load tracker data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

//   TODO: Change the loading
  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Weekly Reading Log: {new Date().toLocaleString('default', { month: 'long' })}
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="w-full text-left border-collapse bg-white">
          
          {/* --- TABLE HEADER (WEEKS) --- */}
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left border-b border-gray-200">Book Title</th>
              {weekHeaders.map((date, index) => (
                <th key={index} className="py-3 px-6 text-center border-b border-gray-200">
                  <div className="font-bold">Week {index + 1}</div>
                  <div className="text-xs text-gray-500">
                    {date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* --- TABLE BODY (BOOKS) --- */}
          <tbody className="text-gray-600 text-sm font-light">
            {books.map((book) => (
              <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                
                {/* Book Title Column */}
                <td className="py-3 px-6 text-left font-medium whitespace-nowrap text-gray-900">
                  {book.title}
                  <span className="block text-xs text-gray-400 font-normal">{book.author}</span>
                </td>

                {/* Weekly Data Columns */}
                {weekHeaders.map((date) => {
                  // Construct Key: YYYY-MM-DD
                  const dateKey = date.toISOString().split('T')[0];
                  
                  // Retrieve data: logs -> dateKey -> bookId
                  const weekData = weeklyLogs[dateKey];
                  const cellValue = weekData ? weekData[book.id] : '-';

                  return (
                    <td key={dateKey} className="py-3 px-6 text-center border-l border-dotted border-gray-200">
                      <span className={`px-2 py-1 rounded ${
                        cellValue === 'Completed' ? 'bg-green-100 text-green-700 font-bold' : 
                        cellValue === '-' ? 'text-gray-300' : 'text-blue-600 font-semibold'
                      }`}>
                        {cellValue}
                      </span>
                    </td>
                  );
                })}

              </tr>
            ))}
            
            {books.length === 0 && (
              <tr>
                <td colSpan={weekHeaders.length + 1} className="py-6 text-center text-gray-400">
                  No active books found. Add a book to start tracking!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookReading;