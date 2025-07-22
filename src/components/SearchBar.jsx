// src/components/SearchBar.js
import DOMPurify from "isomorphic-dompurify";

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="container d-flex search-pokemon-box">
      <input
        type="text"
        id="search-pokemon"
        className="form-control"
        placeholder={DOMPurify.sanitize(`Type the pokemon name you're looking at`)}
        autoComplete="off"
        value={DOMPurify.sanitize(searchQuery)}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
