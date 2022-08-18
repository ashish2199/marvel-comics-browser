import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import App from "App";

describe("App", () => {
  describe("Verify App structure", () => {
    test("renders App semantic structures", () => {
      render(<App />);

      expect(screen.getByText("Marvel")).toBeInTheDocument();
      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByRole("heading")).toBeInTheDocument();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    test("should have search field with placeholder text", () => {
      render(<App />);
      expect(screen.getByRole("searchbox")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Search by title")
      ).toBeInTheDocument();
    });

    test("should have clear button", () => {
      render(<App />);
      expect(
        screen.getByRole("button", { name: /clear/i })
      ).toBeInTheDocument();
    });

    test("should show loading gif", () => {
      render(<App />);
      expect(
        screen.getByRole("img", { name: /Loading comics/i })
      ).toBeInTheDocument();
    });

    test("should show loading characters heading", () => {
      render(<App />);
      expect(
        screen.getByRole("heading", { name: /Loading characters.../i })
      ).toBeInTheDocument();
    });

    test("should hide loading gif after data is recieved", async () => {
      render(<App />);

      await waitForElementToBeRemoved(() =>
        screen.queryByRole("heading", { name: /Loading characters.../i })
      );
    });
  });
});
