const ResultsTable = ({ data, selectedArrondissements, selectedFilters, loading }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  // Function to apply paid and free filters to the data
  const applyPaidFreeFilters = () => {
    if (!selectedFilters.paid && !selectedFilters.free) {
      return data; // Show all data if both paid and free filters are unchecked
    }

    return data.filter((item) => {
      const isPaid = item.payant === "Oui";
      return (selectedFilters.paid && isPaid) || (selectedFilters.free && !isPaid);
    });
  };

  // Apply filters based on selected arrondissements
  const filteredData = selectedArrondissements.length > 0
    ? applyPaidFreeFilters().filter(item => selectedArrondissements.includes(item.arrondissement))
    : applyPaidFreeFilters();

  return (
    <>
      <div>
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
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => {
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
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
    </>
  );
};


export default ResultsTable;













