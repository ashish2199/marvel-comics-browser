import {
  BASE_URL,
  DEFAULT_LIMIT,
  DEFAULT_ORDER_BY,
  DEFAULT_COMICS_THUMBNAIL_SIZE,
  API_ENDPOINTS,
  PUBLIC_KEY,
  PRIVATE_KEY,
} from "constants/endpoints";
import { createQueryParamsStr, getQueryHash } from "utils/queries/common";

const { comicsV1 } = API_ENDPOINTS;

export default async function fetchComics(
  characters = [],
  titleStartsWith = "",
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
    characters,
    titleStartsWith,
    orderBy,
    limit,
    offset,
  };
  const url = BASE_URL + comicsV1 + createQueryParamsStr(obj);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Unable to fetch Comics");
  }
  const data = await response.json();
  const parseData = parseComicsData(data);
  return parseData;
}

function parseComicsData(response) {
  const results = response.data.results;
  const comicsWithImages = results.filter((comic) => {
    return true;
    //return !comic.thumbnail.path.includes("image_not_available");
  });
  const comics = comicsWithImages.map((characterDetails) => {
    const { id, title, issueNumber, thumbnail } = characterDetails;
    const thumbnailUrl = `${thumbnail.path}/${DEFAULT_COMICS_THUMBNAIL_SIZE}.${thumbnail.extension}`;
    return {
      id,
      title,
      issueNumber,
      thumbnailUrl,
    };
  });
  return {
    comics,
    meta: { lastPage: Math.floor(response.data.total / response.data.limit) },
  };
}
