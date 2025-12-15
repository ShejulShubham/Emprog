// src/utils/readingTrackerHandler.js

/**
 * 1. Helper: Get all Sundays (or start of weeks) for the current month.
 * This determines the columns in your grid.
 */
export const getWeekHeaders = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const dates = [];

  // Start at day 1 of the month
  const d = new Date(year, month, 1);

  // Find the first Sunday
  while (d.getDay() !== 0) {
    d.setDate(d.getDate() + 1);
  }

  // Add all Sundays of this month to the array
  while (d.getMonth() === month) {
    dates.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }
  return dates;
};

/**
 * 2. Main Handler: Fetches data (Mock version for now).
 * Simulates an API call to Firebase.
 */
export const fetchTrackerData = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const weekHeaders = getWeekHeaders();
  
  // Convert date objects to YYYY-MM-DD strings for keys
  const dateKeys = weekHeaders.map(d => d.toISOString().split('T')[0]);

  // --- MOCK DATA: BOOKS (Rows) ---
  const mockBooks = [
    { id: 'b1', title: 'Clean Code', author: 'Robert C. Martin', status: 'Reading' },
    { id: 'b2', title: 'Game of Thrones 3', author: 'George R.R. Martin', status: 'Reading' },
    { id: 'b3', title: 'Thinking Fast & Slow', author: 'Daniel Kahneman', status: 'Reading' },
    { id: 'b4', title: 'Ignited Minds', author: 'A.P.J. Abdul Kalam', status: 'Reading' },
  ];

  // --- MOCK DATA: LOGS (Columns) ---
  // We construct this dynamically so it matches the current month's dates
  const mockLogs = {};

  // Week 1 Data (using the first Sunday of this month)
  if (dateKeys[0]) {
    mockLogs[dateKeys[0]] = {
      b1: 70,           // Clean Code: page 70
      b2: 12,           // GOT: page 12
      b3: 142,          // Thinking Fast: page 142
      b4: 'Started',    // Ignited Minds: String status
    };
  }

  // Week 2 Data
  if (dateKeys[1]) {
    mockLogs[dateKeys[1]] = {
      b1: 120,
      b2: 45,
      b3: 'REST',       // Example of string status
      b4: 50,
    };
  }

  // Week 3 Data
  if (dateKeys[2]) {
    mockLogs[dateKeys[2]] = {
      b1: 210,
      b2: 89,
      b3: 160,
      b4: 'Completed',  // Finished book
    };
  }

  return {
    books: mockBooks,
    weeklyLogs: mockLogs,
    weekHeaders: weekHeaders,
  };
};