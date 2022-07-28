import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Blogform from "./Blogform";

describe("Blogform", () => {
  test("form calls event handler with input detail", () => {
    const handleCreate = jest.fn();
    render(<Blogform handleCreate={handleCreate} />);
    const btnSubmit = screen.getByRole("button", { name: /create/i });
    const titleInput = screen.getByLabelText("Title");
    const authorInput = screen.getByPlaceholderText("author");
    const urlInput = screen.getByPlaceholderText("url");
    expect(titleInput).toBeInTheDocument();
    expect(authorInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    fireEvent.click(btnSubmit);
    expect(handleCreate.mock.calls).toHaveLength(1);
  });
});
