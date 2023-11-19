import React from 'react';

// Functional component for a filter form.
const FilterComponent = ({ onFilterChange, onCheckboxChange }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Arrondissement"
        onChange={(e) => onFilterChange('arrondissement', e.target.value)}
      />
      <div>
        <label>
          Paid
          <input
            type="checkbox"
            onChange={() => onCheckboxChange('paid')}
          />
        </label>
        <label>
          Free
          <input
            type="checkbox"
            onChange={() => onCheckboxChange('free')}
          />
        </label>
      </div>
    </div>
  );
};

export default FilterComponent;
