import './TransferControls.css';

function TransferControls({
  canAdd,
  canRemove,
  onAdd,
  onRemove,
}) {
  return (
    <div className="transfer-controls" aria-label="Transfer pharmacies">
      <button
        className="transfer-button add-button"
        type="button"
        disabled={!canAdd}
        onClick={onAdd}
      >
        <span>Add</span>
        <span className="button-arrow" aria-hidden="true">→</span>
      </button>
      <button
        className="transfer-button remove-button"
        type="button"
        disabled={!canRemove}
        onClick={onRemove}
      >
        <span className="button-arrow" aria-hidden="true">←</span>
        <span>Remove</span>
      </button>
    </div>
  );
}

export default TransferControls;
