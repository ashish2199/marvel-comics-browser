import React, { useContext } from "react";
import { useQuery } from "react-query";
import ComicsGrid from "components/ComicsGrid";
import { DEFAULT_GRID_ITEMS_LIMIT } from "constants/endpoints";
import SearchContext from "contexts/SearchContext";
import fetchComics from "utils/queries/fetchComics";
import "./styles.scss";

function GridContainer() {
  const {
    clearFilters,
    isCustomSearchEnabled,
    page,
    setPage,
    getSelectedCharacterIds,
    searchTitle,
    getSelectedCharacterNames,
  } = useContext(SearchContext);

  let characters = getSelectedCharacterIds();
  const selectedCharacters = getSelectedCharacterNames();

  let limit = DEFAULT_GRID_ITEMS_LIMIT;
  const results = useQuery(
    ["fetchComics", page, limit, characters, searchTitle],
    async () => {
      const data = await fetchComics(characters, searchTitle, page, limit);
      return data;
    }
  );

  let showHypen = selectedCharacters.length > 0 ? " - " : "";
  let gridTitle = isCustomSearchEnabled()
    ? `Search Results for '${searchTitle}'`
    : `Explore ${showHypen} ${selectedCharacters.join(", ")}`;

  let clearFiltersControl = (
    <button onClick={() => clearFilters()} className="clearnFilterBtn">
      Clear
    </button>
  );

  return (
    <div className="grid-browser">
      <ComicsGrid
        results={results}
        pageProps={{ page, setPage }}
        gridOptions={{
          gridTitle,
          clearFiltersControl,
        }}
      />
    </div>
  );
}

export default GridContainer;
