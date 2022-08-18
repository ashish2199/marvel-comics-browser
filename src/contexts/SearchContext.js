import { createContext, useState } from "react";

const intialValue = {
  characterIds: [],
};

const SearchContext = createContext(intialValue);

export function SearchProvider({ children }) {
  const [selectedCharacters, setCharacters] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [page, setPage] = useState(1);

  const addToSearchFilter = function (newCharacter) {
    setCharacters([...selectedCharacters, newCharacter]);
    setPage(1);
  };

  const removeFromSearchFilter = function (characterToRemove) {
    const filteredCharacters = selectedCharacters.filter((character) => {
      return character.id !== characterToRemove.id;
    });
    setCharacters(filteredCharacters);
    setPage(1);
  };

  const isPresentInSearchFilter = function (characterToCheck) {
    return selectedCharacters.some((character) => {
      return character.id === characterToCheck.id;
    });
  };

  const getSelectedCharacterNames = function () {
    return selectedCharacters.map((character) => character.name);
  };

  const getSelectedCharacterIds = function () {
    return selectedCharacters.map((character) => character.id);
  };

  const isCustomSearchEnabled = function () {
    return !!searchTitle;
  };

  const clearFilters = function () {
    setCharacters([]);
    setPage(1);
    setSearchTitle("");
  };
  const changeSearchTitle = function (text) {
    setSearchTitle(text);
    setCharacters([]);
    setPage(1);
  };

  return (
    <SearchContext.Provider
      value={{
        page,
        searchTitle,
        isCustomSearchEnabled,
        setPage,
        clearFilters,
        changeSearchTitle,
        getSelectedCharacterIds,
        getSelectedCharacterNames,
        isPresentInSearchFilter,
        addToSearchFilter,
        removeFromSearchFilter,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
export default SearchContext;
