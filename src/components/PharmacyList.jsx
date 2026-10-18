import './PharmacyList.css';

function PharmacyList({ title, pharmacies, selected, onSelect, id, loading, error }) {
  return (
    <section className="pharmacy-panel" aria-labelledby={`${id}-heading`}>
      <h2 className="panel-heading" id={`${id}-heading`}>{title}</h2>
      <ul className="pharmacy-list" aria-label={title}>
        {loading && <li className="list-message" role="status">Loading pharmacies…</li>}
        {error && <li className="list-message error" role="alert">{error}</li>}
        {!loading && !error && pharmacies.map((pharmacy) => (
          <li key={pharmacy}>
            <button
              className="pharmacy-option"
              type="button"
              aria-pressed={selected === pharmacy}
              onClick={() => onSelect(pharmacy)}
            >
              {pharmacy}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PharmacyList;
