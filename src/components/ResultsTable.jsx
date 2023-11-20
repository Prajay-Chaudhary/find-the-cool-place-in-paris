const ResultsTable = ({ data, selectedArrondissements, selectedFilters, selectedCategory, loading, selectedDays }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  const applyPaidFreeFilters = () => {
    // Return all data if no filters are applied
    if (!selectedFilters.paid && !selectedFilters.free && !selectedCategory) {
      return data;
    }

    return data.filter((item) => {
      const isPaid = item.payant === "Oui";
      const isFree = item.payant === "Non";
      const matchesCategory = !selectedCategory || selectedCategory === item.categorie;

      // Check if the item matches the paid/free filter and the category filter
      if (selectedFilters.paid || selectedFilters.free) {
        return ((selectedFilters.paid && isPaid) || (selectedFilters.free && isFree)) && matchesCategory;
      }

      // If only category filter is applied
      return matchesCategory;
    });
  };
  // Apply filters based on selected arrondissements
  const filteredData = selectedArrondissements.length > 0
    ? applyPaidFreeFilters().filter(item => selectedArrondissements.includes(item.arrondissement))
    : applyPaidFreeFilters();


  // Function to apply day filter to the data
  const applyDayFilter = () => {
    if (!selectedDays.length) {
      return filteredData; // Show all data if no day is selected
    }

    return filteredData.filter((item) => {
      return selectedDays.some((day) => {
        const horairesDay = `horaires_${day}`;
        return item[horairesDay] && item[horairesDay] !== '-';
      });
    });
  };

  // Apply day filter based on selected days
  const filteredDataByDay = applyDayFilter();

  return (
    <>
      <div className="p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="font-nexa text-main-color">
                  <th>Identifiant</th>
                  <th>GID</th>
                  <th>Name</th>
                  <th>type</th>
                  <th>type</th>
                  <th>Opening status</th>
                  <th>Paid</th>
                  <th>Green spaces</th>
                  <th>Arrondissement</th>
                  <th>Municipality</th>
                  <th>Available</th>
                  <th>User proposal</th>
                  <th>Heatwave opening</th>
                  <th>Catagory</th>
                  <th>Opening 24h</th>
                  <th>Summer night opening</th>
                  <th>Address</th>
                  <th>Time period</th>
                  <th>Schedules monday</th>
                  <th>Schedules Tuesday</th>
                  <th>Schedules Wednesday</th>
                  <th>Schedules Thursday</th>
                  <th>Schedules Friday</th>
                  <th>Schedules Saturday</th>
                  <th>Schedules Sunday</th>
                </tr>
              </thead>
              <tbody>
                {filteredDataByDay.map((item, index) => {
                  const gid = item.gid || 'undefined';
                  const identifiant = item.identifiant || 'undefined';
                  const key = `${identifiant}-${gid || identifiant}-${index}`;

                  return (
                    <tr key={key} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white border'}>
                      <td className="border px-4 py-2">{item.gid}</td>
                      <td className="border px-4 py-2">{item.identifiant}</td>
                      <td className="border px-4 py-2">{item.nom}</td>
                      <td className="border px-4 py-2">{item.type}</td>
                      <td className="border px-4 py-2">{item.addresse}</td>
                      <td className="border px-4 py-2">{item.statut_ouverture}</td>
                      <td className="border px-4 py-2">{item.payant}</td>
                      <td className="border px-4 py-2">{item.nsq_espace_vert}</td>
                      <td className="border px-4 py-2">{item.arrondissement}</td>
                      <td className="border px-4 py-2">{item.commune}</td>
                      <td className="border px-4 py-2">{item.dispo}</td>
                      <td className="border px-4 py-2">{item.proposition_usager}</td>
                      <td className="border px-4 py-2">{item.canicule_ouverture}</td>
                      <td className="border px-4 py-2">{item.categorie}</td>
                      <td className="border px-4 py-2">{item.ouvert_24h}</td>
                      <td className="border px-4 py-2">{item.ouverture_estivale_nocturne}</td>
                      <td className="border px-4 py-2">{item.adresse}</td>
                      <td className="border px-4 py-2">{item.horaires_periode}</td>
                      <td className="border px-4 py-2">{item.horaires_lundi}</td>
                      <td className="border px-4 py-2">{item.horaires_mardi}</td>
                      <td className="border px-4 py-2">{item.horaires_mercredi}</td>
                      <td className="border px-4 py-2">{item.horaires_jeudi}</td>
                      <td className="border px-4 py-2">{item.horaires_vendredi}</td>
                      <td className="border px-4 py-2">{item.horaires_samedi}</td>
                      <td className="border px-4 py-2">{item.horaires_dimanche}</td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};


export default ResultsTable;

