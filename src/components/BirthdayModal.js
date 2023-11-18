import { useSelector } from 'react-redux';

const BirthdayModal = ({ show, onClose }) => {
  const user = useSelector((state) => state.auth.user);
  if (!show) {
    return null;
  }

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Happy Birthday {user.username}!</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body text-center">
            <img
              src="/happyBirthday.gif"
              alt="Happy Birthday"
              className="img-fluid"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayModal;
