import PropTypes from 'prop-types';
function Button({ onClick }) {
  return (
    <button type="button" onClick={onClick} className="Button">
      Load more
    </button>
  );
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
