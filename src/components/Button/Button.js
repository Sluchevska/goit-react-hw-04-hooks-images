import PropTypes from 'prop-types';
function Button({ onClick }) {
  return (
    <div className="btnContainer">
    <button type="button" onClick={onClick} className="Button">
      Load more
      </button>
      </div>
  );
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

