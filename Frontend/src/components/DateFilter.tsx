import React from 'react';
import './DateFilter.css';

export interface FilterOption {
  value: string;
  label: string;
}

interface DateFilterProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  options: FilterOption[];
}

const DateFilter: React.FC<DateFilterProps> = ({ selectedMonth, onMonthChange, options }) => {
  return (
    <div className="date-filter">
      <div className="filter-group">
        <label className="filter-label">Período:</label>
        <select 
          value={selectedMonth} 
          onChange={(e) => onMonthChange(e.target.value)}
          className="filter-select"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateFilter;
