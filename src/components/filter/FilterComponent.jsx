import React from 'react';

// Functional component for a filter form.
const FilterComponent = ({ onCheckboxChange, onCategoryChange, onDayChange, className }) => {
  const daysOfWeek = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  return (
    <div className={`bg-gray-200 p-4 mb-4 ${className}`}>
      <div>
        <h2 className="text-lg font-semibold mb-2 text-main-color">Category by Price</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            Paid
            <input
              className="ml-2"
              type="checkbox"
              onChange={() => onCheckboxChange('paid')}
            />
          </label>
          <label className="flex items-center">
            Free
            <input
              className="ml-2"
              type="checkbox"
              onChange={() => onCheckboxChange('free')}
            />
          </label>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2 text-main-color">Category by Green Spaces/ Park Type</h2>
          <select
            className="border rounded py-2 px-4"
            onChange={(e) => onCategoryChange(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Jardin">Jardin</option>
            <option value="Square">Square</option>
            <option value="Plate-bande">Plate-bande</option>
            <option value="Jardiniere">Jardiniere</option>
            <option value="Promenade">Promenade</option>
            <option value="Ile">Ile</option>
            <option value="Jardinet">Jardinet</option>
            <option value="Terrain de boules">Terrain de boules</option>
            <option value="Cimeti\u00e8re">Cimeti\u00e8re</option>
            <option value="Parc">Parc</option>
            <option value="Esplanade">Esplanade</option>
            <option value="Mail">Mail</option>
            <option value="Jardin d'immeubles">Jardin d'immeubles</option>
            <option value="Espace Vert">Espace Vert</option>
            <option value="Quai">Quai</option>
            <option value="Jardin partage">Jardin partage</option>
            <option value="Decoration">Decoration</option>
            <option value="Pelouse">Pelouse</option>
            <option value="Archipel">Archipel</option>
            <option value="Talus">Talus</option>
          </select>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold my-2 text-main-color">Category by Days</h2>
        <div className="flex flex-wrap">
          {daysOfWeek.map((day) => (
            <label key={day} className="flex items-center mr-4">
              {day.charAt(0).toUpperCase() + day.slice(1)}
              <input
                className="ml-2"
                type="checkbox"
                onChange={() => onDayChange(day)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
