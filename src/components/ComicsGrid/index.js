import React from "react";

import ComicItem from "components/ComicItem";
import Paginator from "components/Paginator";

import loadingGif from "assets/imgs/loading.gif";
import "./styles.scss";

function ComicsGrid({ results, pageProps, gridOptions }) {
  const { isLoading, error, data = [] } = results;
  function getGridContents() {
    let contents;
    if (isLoading) {
      contents = (
        <div className="loading-comics">
          <img src={loadingGif} alt="Loading comics" />
          Loading ...
        </div>
      );
    } else if (!isLoading && data) {
      if (data.comics.length === 0) {
        contents = (
          <div className="loading-comics">
            Could not find any comics with given title.
          </div>
        );
      } else {
        contents = (
          <div className="grid-container">
            {data.comics.map((gridItem, index) => (
              <ComicItem
                comicDetails={gridItem}
                key={`${gridItem.title}_${gridItem.issueNumber}_${index}`}
              />
            ))}
          </div>
        );
      }
    }
    return contents;
  }

  const lastPage = !isLoading && data ? data.meta.lastPage : 10;
  let { gridTitle, clearFiltersControl } = gridOptions;
  return (
    <>
      <div className="grid-options">
        <div className="grid-title">{gridTitle}</div>
        <div className="grid-controls">{clearFiltersControl}</div>
      </div>
      <div className="comics-grid">
        {getGridContents()}
        <Paginator {...pageProps} lastPage={lastPage} />
      </div>
    </>
  );
}

export default ComicsGrid;
