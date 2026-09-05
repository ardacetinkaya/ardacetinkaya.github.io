import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  afterEach(() => {
    cleanup();
  });

  test("defaults to auto with no stored preference", () => {
    const { container } = render(<ThemeToggle />);
    expect(container.querySelector(".uil-desktop")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBeNull();
    expect(window.localStorage.getItem("theme")).toBeNull();
  });

  test("cycles auto -> light -> dark -> auto on click", () => {
    const { container, getByRole } = render(<ThemeToggle />);
    const button = getByRole("button");

    fireEvent.click(button);
    expect(container.querySelector(".uil-sun")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(window.localStorage.getItem("theme")).toBe("light");

    fireEvent.click(button);
    expect(container.querySelector(".uil-moon")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(window.localStorage.getItem("theme")).toBe("dark");

    fireEvent.click(button);
    expect(container.querySelector(".uil-desktop")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBeNull();
    expect(window.localStorage.getItem("theme")).toBeNull();
  });

  test("initializes from an existing stored preference", () => {
    window.localStorage.setItem("theme", "dark");
    const { container } = render(<ThemeToggle />);
    expect(container.querySelector(".uil-moon")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  test("ignores an invalid stored preference and falls back to auto", () => {
    window.localStorage.setItem("theme", "purple");
    const { container } = render(<ThemeToggle />);
    expect(container.querySelector(".uil-desktop")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBeNull();
    expect(window.localStorage.getItem("theme")).toBeNull();
  });
});
