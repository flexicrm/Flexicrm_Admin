import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import './CustomDropdown.scss';

const CustomDropdown = ({ options, onChange, value, placeholder, customDateRange, onCustomDateChange, onApplyCustomDate }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleOptionClick = (option) => {
        onChange(option);
        setDropdownVisible(false);
    };

    const handleCustomDateChange = (e, type) => {
        onCustomDateChange(e.value, type);
    };

    const handleApplyCustomDate = () => {
        onApplyCustomDate();
        setDropdownVisible(false);
    };

    return (
        <div className="custom-dropdown-container">
            <Button onClick={toggleDropdown} className="custom-dropdown-button">
                {value?.label || placeholder}
            </Button>
            {dropdownVisible && (
                <div className="custom-dropdown-menu">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="custom-dropdown-item"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                    {customDateRange && (
                        <div className="custom-date-selector">
                            <div className="p-grid">
                                <div className="p-col">
                                    <label htmlFor="startDate">Start Date</label>
                                    <Calendar
                                        id="startDate"
                                        value={customDateRange.start}
                                        onChange={(e) => handleCustomDateChange(e, 'start')}
                                        dateFormat="yy-mm-dd"
                                        placeholder="Select Start Date"
                                        mask="9999-99-99"
                                    />
                                </div>
                                <div className="p-col">
                                    <label htmlFor="endDate">End Date</label>
                                    <Calendar
                                        id="endDate"
                                        value={customDateRange.end}
                                        onChange={(e) => handleCustomDateChange(e, 'end')}
                                        dateFormat="yy-mm-dd"
                                        placeholder="Select End Date"
                                        mask="9999-99-99"
                                    />
                                </div>
                            </div>
                            <Button
                                label="Apply"
                                className="p-button-success p-mt-2"
                                onClick={handleApplyCustomDate}
                                disabled={!customDateRange.start || !customDateRange.end}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
