import './Modal.css';

/**
 * Generic centered overlay/card, used for both the envelope reveal text and
 * the photo-wall lightbox (they shared one .modal-overlay/.modal-card pair
 * in the original markup - here it's just reused as a component).
 */
export default function Modal({ open, onClose, children }) {
  return (
    <div
      className={`modal-overlay${open ? ' open' : ''}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-card">
        {children}
        <button className="modal-close" onClick={onClose}>
          close
        </button>
      </div>
    </div>
  );
}
