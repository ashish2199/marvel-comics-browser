import React, { useContext } from "react";
import { debounce } from "lodash";
import SearchContext from "contexts/SearchContext";
import "./styles.scss";

function SearchInput() {
  const { changeSearchTitle } = useContext(SearchContext);

  const debouncedUpdateTitle = debounce((text) => {
    changeSearchTitle(text);
  }, 2000);

  function onTextchange(evt) {
    const text = evt.target.value;
    debouncedUpdateTitle(text);
  }

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="search"
        placeholder="Search by title"
        onChange={onTextchange}
      />
    </div>
  );
}

export default SearchInput;
