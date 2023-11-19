import React, { useEffect, useState } from 'react';
import ResultsTable from '../ResultsTable';
import fontainesABoire from '../../data/fontainesABoire.json';
import ilotsDeFraicheurEquipementsActivites from '../../data/ilotsDeFraicheurEquipementsActivites.json';
import ilotsDeFraicheurEspacesVertsFrais from '../../data/ilotsDeFraicheurEspacesVertsFrais.json';


const FetchData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);

        // Use local data directly
        const data1 = ilotsDeFraicheurEquipementsActivites;
        const data2 = fontainesABoire;
        const data3 = ilotsDeFraicheurEspacesVertsFrais;

        console.log('Data 1:', data1);
        console.log('Data 2:', data2);
        console.log('Data 3:', data3);

        const unifiedData = mergeData(data1, data2, data3);
        console.log('Unified Data:', unifiedData);

        setData(unifiedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to merge data from different datasets
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
      <ResultsTable data={data} /> {/* Pass the merged data to the Results component */}
    </div>
  );
};

export default FetchData;
