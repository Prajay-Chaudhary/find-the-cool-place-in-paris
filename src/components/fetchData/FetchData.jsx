import React, { useEffect, useState } from 'react';
import ResultsTable from '../ResultsTable';
import fontainesABoire from '../../data/fontainesABoire.json';
import ilotsDeFraicheurEquipementsActivites from '../../data/ilotsDeFraicheurEquipementsActivites.json';
import ilotsDeFraicheurEspacesVertsFrais from '../../data/ilotsDeFraicheurEspacesVertsFrais.json';
import FilterComponent from '../filter/FilterComponent';

const FetchData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedArrondissements, setSelectedArrondissements] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({ paid: false, free: false });

  // New state to store the count of available data for each arrondissement
  const [arrondissementCounts, setArrondissementCounts] = useState({});

  const handleCheckboxChange = (filter) => {
    setSelectedFilters((prevFilters) => ({ ...prevFilters, [filter]: !prevFilters[filter] }));
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);

        const data1 = ilotsDeFraicheurEquipementsActivites;
        const data2 = fontainesABoire;
        const data3 = ilotsDeFraicheurEspacesVertsFrais;

        const unifiedData = mergeData(data1, data2, data3);
        setData(unifiedData);

        // Calculate the count of available data for each arrondissement
        const counts = calculateArrondissementCounts(unifiedData);
        setArrondissementCounts(counts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateArrondissementCounts = (data) => {
    const counts = {};

    // Initialize counts for all arrondissements to 0
    Array.from({ length: 20 }, (_, i) => {
      const arrondissementNumber = i + 1;
      const arrondissement = arrondissementNumber <= 9 ? `7500${arrondissementNumber}` : `750${arrondissementNumber}`;
      counts[arrondissement] = 0;
    });

    // Count the available data for each arrondissement
    data.forEach((item) => {
      if (!selectedArrondissements.length || selectedArrondissements.includes(item.arrondissement)) {
        const isPaid = item.payant === 'Oui';
        const meetsPaidFreeFilters = (!selectedFilters.paid && !selectedFilters.free) ||
          (selectedFilters.paid && isPaid) || (selectedFilters.free && !isPaid);

        if (meetsPaidFreeFilters) {
          counts[item.arrondissement]++;
        }
      }
    });

    return counts;
  };

  // Merge the data from three datasets
  const mergeData = (data1, data2, data3) => {
    const mergedData = [
      ...(Array.isArray(data1) ? data1 : []),
      ...(Array.isArray(data2) ? data2 : []),
      ...(Array.isArray(data3) ? data3 : []),
    ];

    return mergedData;
  };

  return (
    <div>
      <FilterComponent
        onFilterChange={(filterName, value) => console.log(`Filter ${filterName}: ${value}`)}
        onCheckboxChange={handleCheckboxChange}
      />
      <div>
        {Array.from({ length: 20 }, (_, i) => {
          const arrondissementNumber = i + 1;
          const arrondissement = arrondissementNumber <= 9 ? `7500${arrondissementNumber}` : `750${arrondissementNumber}`;
          return (
            <div key={arrondissement}>
              <input
                type="checkbox"
                id={arrondissement}
                name={arrondissement}
                value={arrondissement}
                onChange={() => setSelectedArrondissements((prev) => toggleArrondissement(prev, arrondissement))}
              />
              <label htmlFor={arrondissement}>{arrondissement}</label>
              <span style={{ marginLeft: '8px' }}>({arrondissementCounts[arrondissement]})</span>
            </div>
          );
        })}
      </div>
      <ResultsTable
        data={data}
        selectedArrondissements={selectedArrondissements}
        selectedFilters={selectedFilters}
        loading={loading}
      />
    </div>
  );
};

// Toggles the presence of an 'arrondissement' in the given array.
const toggleArrondissement = (arrondissements, arrondissement) => {
  if (arrondissements.includes(arrondissement)) {
    return arrondissements.filter((item) => item !== arrondissement);
  } else {
    return [...arrondissements, arrondissement];
  }
};

export default FetchData;