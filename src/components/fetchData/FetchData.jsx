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
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [arrondissementCounts, setArrondissementCounts] = useState({});

  // Handle checkbox change for paid and free filters.
  const handleCheckboxChange = (filter) => {
    setSelectedFilters((prevFilters) => ({ ...prevFilters, [filter]: !prevFilters[filter] }));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // useEffect hook to fetch and merge data from different sources.
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

  // handle Days category 
  const handleDayChange = (day) => {
    setSelectedDays((prevDays) => {
      if (prevDays.includes(day)) {
        return prevDays.filter((d) => d !== day);
      } else {
        return [...prevDays, day];
      }
    });
  };

  // Toggles the presence of an 'arrondissement' in the given array.
  const toggleArrondissement = (arrondissements, arrondissement) => {
    if (arrondissements.includes(arrondissement)) {
      return arrondissements.filter((item) => item !== arrondissement);
    } else {
      return [...arrondissements, arrondissement];
    }
  };

  return (
    <>
      <div className="lg:flex flex-row justify-between items-start p-4">
        <div className="md:w-1/4 mr-4">
          <FilterComponent
            onCheckboxChange={handleCheckboxChange}
            onCategoryChange={handleCategoryChange}
            onDayChange={handleDayChange}
          />
          <div>
            <h2 className="text-lg font-semibold mb-2 text-main-color">Category by Arrondissement</h2>
            {Array.from({ length: 20 }, (_, i) => {
              const arrondissementNumber = i + 1;
              const arrondissement = arrondissementNumber <= 9 ? `7500${arrondissementNumber}` : `750${arrondissementNumber}`;
              return (
                <div key={arrondissement} className='m-2'>
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
        </div>
        <ResultsTable
          data={data}
          selectedArrondissements={selectedArrondissements}
          selectedFilters={selectedFilters}
          selectedCategory={selectedCategory}
          selectedDays={selectedDays}
          loading={loading}
          className="w-3/4"
        />
      </div>
    </>
  );
};

export default FetchData;