import {
  BASE_URL,
  DEFAULT_LIMIT,
  DEFAULT_ORDER_BY,
  DEFAULT_CHARACTER_THUMBNAIL_SIZE,
  API_ENDPOINTS,
  PUBLIC_KEY,
  PRIVATE_KEY,
} from "constants/endpoints";
import { createQueryParamsStr, getQueryHash } from "utils/queries/common";

const { charactersV1 } = API_ENDPOINTS;

export default async function fetchCharacters(
  page = 0,
  limit = DEFAULT_LIMIT,
  orderBy = DEFAULT_ORDER_BY
) {
  const timeStamp = new Date().getTime();
  const hash = getQueryHash(timeStamp, PUBLIC_KEY, PRIVATE_KEY);
  const offset = page * limit;

  const obj = {
    ts: timeStamp,
    apikey: PUBLIC_KEY,
    hash,
    orderBy,
    limit,
    offset,
  };
  const url = BASE_URL + charactersV1 + createQueryParamsStr(obj);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable to fetch Characters");
  }
  const data = await response.json();
  const parseData = parseCharactersData(data, page);
  return parseData;
}

function parseCharactersData(response, page) {
  const results = response.data.results;
  const charactersWithImages = results.filter(
    (character) => !character.thumbnail.path.includes("image_not_available")
  );
  const characters = charactersWithImages.map((characterDetails) => {
    const { id, name, thumbnail } = characterDetails;
    const thumbnailUrl = `${thumbnail.path}/${DEFAULT_CHARACTER_THUMBNAIL_SIZE}.${thumbnail.extension}`;
    return {
      id,
      name,
      thumbnailUrl,
    };
  });
  return {
    characters,
    pageParam: {
      offset: response.data.offset,
      limit: response.data.offset,
      page,
    },
  };
}
