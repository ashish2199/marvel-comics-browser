import Avatar from "components/Avatar";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";

import Carousel from "components/Carousel";
import SearchContext from "contexts/SearchContext";

import fetchCharacters from "utils/queries/fetchCharacters.js";
import "./styles.scss";

function CharactersFilter({ page = 0, limit = 100 }) {
  const {
    addToSearchFilter,
    removeFromSearchFilter,
    isPresentInSearchFilter,
    isCustomSearchEnabled,
  } = useContext(SearchContext);
  const { isLoading, error, data } = useQuery(
    ["fetchCharacters", page, limit],
    async () => {
      const data = await fetchCharacters(page, limit);
      return data;
    }
  );

  function toggleSelection(charachter) {
    if (isPresentInSearchFilter(charachter)) {
      removeFromSearchFilter(charachter);
    } else {
      addToSearchFilter(charachter);
    }
  }

  let content;
  if (isLoading) {
    content = <h1 className="loading-text">Loading characters...</h1>;
  }
  if (error) {
    content = (
      <h1 className="error-text">An error has occurred: {error.message}</h1>
    );
  }
  const isContentAvailable = !isLoading && !error && data;
  if (isContentAvailable) {
    let items = data.characters.map((charachter) => (
      <div
        key={charachter.id}
        role="button"
        onClick={() => {
          toggleSelection(charachter);
        }}
      >
        <Avatar
          imgSrc={charachter.thumbnailUrl}
          name={charachter.name}
          isSelected={isPresentInSearchFilter(charachter)}
        />
      </div>
    ));
    content = (
      <Carousel
        items={items}
        size={7}
        disableCarousel={isCustomSearchEnabled()}
      />
    );
  }

  return (
    <>
      <div className="characters-container">
        <div className="avatar-container">{content}</div>
      </div>
    </>
  );
}

export default CharactersFilter;
