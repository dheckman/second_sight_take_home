import { useState } from 'react';
import PharmacyList from './components/PharmacyList.jsx';
import TransferControls from './components/TransferControls.jsx';
import useAvailablePharmacies from './hooks/useAvailablePharmacies.js';
import './App.css';

function App() {
  const {
    pharmacies: availablePharmacies,
    setPharmacies: setAvailablePharmacies,
    loading,
    error: loadError,
  } = useAvailablePharmacies();
  const [contractedPharmacies, setContractedPharmacies] = useState([]);
  const [selectedAvailablePharmacy, setSelectedAvailablePharmacy] = useState('');
  const [selectedContractedPharmacy, setSelectedContractedPharmacy] = useState('');

  function addPharmacy() {
    if (!selectedAvailablePharmacy) return;

    setAvailablePharmacies((pharmacies) =>
      pharmacies.filter((name) => name !== selectedAvailablePharmacy),
    );
    setContractedPharmacies((pharmacies) => [...pharmacies, selectedAvailablePharmacy]);
    setSelectedAvailablePharmacy('');
    setSelectedContractedPharmacy(selectedAvailablePharmacy);
  }

  function removePharmacy() {
    if (!selectedContractedPharmacy) return;

    setContractedPharmacies((pharmacies) =>
      pharmacies.filter((name) => name !== selectedContractedPharmacy),
    );
    setAvailablePharmacies((pharmacies) => [...pharmacies, selectedContractedPharmacy]);
    setSelectedContractedPharmacy('');
    setSelectedAvailablePharmacy(selectedContractedPharmacy);
  }

  return (
    <main className="page">
      <div className="transfer-layout">
        <PharmacyList
          id="available"
          title="Available Pharmacies"
          pharmacies={availablePharmacies}
          selected={selectedAvailablePharmacy}
          onSelect={setSelectedAvailablePharmacy}
          loading={loading}
          error={loadError}
        />

        <TransferControls
          canAdd={Boolean(selectedAvailablePharmacy) && !loading && !loadError}
          canRemove={Boolean(selectedContractedPharmacy)}
          onAdd={addPharmacy}
          onRemove={removePharmacy}
        />

        <PharmacyList
          id="contracted"
          title="Contracted Pharmacies"
          pharmacies={contractedPharmacies}
          selected={selectedContractedPharmacy}
          onSelect={setSelectedContractedPharmacy}
        />
      </div>
    </main>
  );
}

export default App;
