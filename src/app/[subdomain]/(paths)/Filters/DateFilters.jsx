
"use client"


// pages/index.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

export default function Home() {
  const [selectedOption, setSelectedOption] = useState(''); // Selected dropdown option
  const [showCalendar, setShowCalendar] = useState(false); // Show custom date calendar popup
  const [startDate, setStartDate] = useState(null); // Custom date start
  const [endDate, setEndDate] = useState(null); // Custom date end

  // Handle dropdown selection
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === 'Custom date') {
      setShowCalendar(true); // Show the calendar popup when "Custom date" is selected
    } else {
      setShowCalendar(false); // Hide the calendar when other options are selected
    }
  };

  const handleCalendarChange = (date) => {
    setStartDate(date);
  };

  const handleCalendarClose = () => {
    setShowCalendar(false); // Close the calendar popup
  };

  // Function to get the date range based on dropdown selection
  const getDateRange = (option) => {
    const today = new Date();
    let startDate, endDate;

    switch (option) {
      case 'Today':
        startDate = endDate = today;
        break;
      case 'Yesterday':
        startDate = endDate = new Date(today.setDate(today.getDate() - 1));
        break;
      case 'Last 7 days':
        startDate = new Date(today.setDate(today.getDate() - 7));
        endDate = today;
        break;
      case 'This month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = today;
        break;
      case 'Last month':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'Last 6 months':
        startDate = new Date(today.setMonth(today.getMonth() - 6));
        endDate = today;
        break;
      case 'Last year':
        startDate = new Date(today.getFullYear() - 1, 0, 1);
        endDate = new Date(today.getFullYear() - 1, 11, 31);
        break;
      default:
        return '';
    }

    return `${format(startDate, 'MMMM dd, yyyy')} - ${format(endDate, 'MMMM dd, yyyy')}`;
  };

  // Get the months for last year and current year
  const getYearMonths = (year) => {
    return Array.from({ length: 12 }, (_, i) => {
      return new Date(year, i, 1);
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Date Range Picker</h1>
      <div style={{ marginBottom: '20px' }}>
        <select onChange={handleSelectChange} value={selectedOption}>
          <option value="">Select Range</option>
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="Last 7 days">Last 7 days</option>
          <option value="This month">This month</option>
          <option value="Last month">Last month</option>
          <option value="Last 6 months">Last 6 months</option>
          <option value="Last year">Last year</option>
          <option value="Custom date">Custom date</option>
        </select>
      </div>

      <div>
        <h2>Selected Date Range:</h2>
        {selectedOption && selectedOption !== 'Custom date' && (
          <p>{getDateRange(selectedOption)}</p>
        )}

        {selectedOption === 'Custom date' && (
          <div>
            <button onClick={() => setShowCalendar(true)}>Select Custom Date</button>
            {showCalendar && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                {/* Calendar for last year */}
                <div style={{ width: '45%' }}>
                  <h3>Last Year</h3>
                  <DatePicker
                    selected={startDate}
                    onChange={handleCalendarChange}
                    inline
                    monthsShown={1}
                    minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                    maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    calendarStartDay={1}
                  />
                </div>

                {/* Calendar for current year */}
                <div style={{ width: '45%' }}>
                  <h3>Current Year</h3>
                  <DatePicker
                    selected={endDate}
                    onChange={handleCalendarChange}
                    inline
                    monthsShown={1}
                    minDate={new Date(new Date().setFullYear(new Date().getFullYear()))}
                    maxDate={new Date(new Date().setFullYear(new Date().getFullYear()))}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    calendarStartDay={1}
                  />
                </div>
              </div>
            )}
            <button onClick={handleCalendarClose}>Close Calendar</button>
          </div>
        )}
      </div>
    </div>
  );
}
