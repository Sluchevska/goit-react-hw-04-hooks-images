import PropTypes from 'prop-types';
const SearchBar = ({ onSearch}) => {
  const handleSearch = e => {
    e.preventDefault();
    onSearch(e.target.elements.pictureName.value.toLowerCase());
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSearch} >
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          name="pictureName"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        
        />
      </form>
    </header>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
