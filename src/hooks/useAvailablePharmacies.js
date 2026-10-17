import { useEffect, useState } from 'react';

function useAvailablePharmacies() {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrent = true;

    async function loadPharmacies() {
      try {
        const response = await fetch('/api/pharmacies');
        if (!response.ok) {
          throw new Error(`The API returned HTTP ${response.status}.`);
        }

        const data = await response.json();
        if (!Array.isArray(data.pharmacies) ||
            !data.pharmacies.every((pharmacy) => typeof pharmacy === 'string')) {
          throw new Error('The API response did not include a valid pharmacy list.');
        }

        if (isCurrent) setPharmacies(data.pharmacies);
      } catch (requestError) {
        if (isCurrent) {
          setError(requestError.message || 'Could not load pharmacies.');
        }
      } finally {
        if (isCurrent) setLoading(false);
      }
    }

    loadPharmacies();
    return () => {
      isCurrent = false;
    };
  }, []);

  return { pharmacies, setPharmacies, loading, error };
}

export default useAvailablePharmacies;
