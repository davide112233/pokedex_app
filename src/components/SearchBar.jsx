import DOMPurify from "isomorphic-dompurify";

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="container d-flex mt-4 search-pokemon-box">
      <input
        type="text"
        id="search-pokemon"
        className="form-control"
        placeholder={DOMPurify.sanitize(`Search a pokemon`)}
        autoComplete="off"
        value={DOMPurify.sanitize(searchQuery)}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
