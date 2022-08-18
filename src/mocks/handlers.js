import { rest } from "msw";
import { charactersResponseJson } from "mocks/mockAPIdata/charactersResponse";
import { comicsResponseApiData } from "mocks/mockAPIdata/comicsResponse";

export const handlers = [
  rest.get(
    "https://gateway.marvel.com/v1/public/characters",
    (req, res, ctx) => {
      // If authenticated, return a mocked user details
      return res(ctx.status(200), ctx.json(charactersResponseJson));
    }
  ),
  rest.get("https://gateway.marvel.com/v1/public/comics", (req, res, ctx) => {
    // If authenticated, return a mocked user details
    return res(ctx.status(200), ctx.json(comicsResponseApiData));
  }),
];
