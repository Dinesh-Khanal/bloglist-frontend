import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("render blog content", () => {
  const blog = {
    title: "sample title for testing",
    author: "test author",
    url: "http://test.com",
    likes: 1,
  };
  test("render title and author", () => {
    render(<Blog blog={blog} />);
    const element = screen.getByText(/sample title for testing/i);
    expect(element).toHaveTextContent("sample title for testing");
    expect(element).toHaveTextContent("test author");
  });
  test("Detail not visible at start", () => {
    render(<Blog blog={blog} />);
    const blogDetail = screen.getByTestId("toggalable");
    expect(blogDetail).toHaveStyle({ display: "none" });
  });
  test("Blog's url and number of likes are visible when view button is clicked", () => {
    render(<Blog blog={blog} />);
    const buttonElement = screen.getByRole("button", { name: /view/i });
    fireEvent.click(buttonElement);
    const blogDetail = screen.getByTestId("toggalable");
    expect(blogDetail).toHaveStyle({ display: "block" });
  });
  test("click of like button calls exact number", () => {
    const mockHandler = jest.fn();
    render(<Blog blog={blog} handleUpdate={mockHandler} />);
    const btnView = screen.getByRole("button", { name: /view/i });
    fireEvent.click(btnView);
    const btnLike = screen.getByRole("button", { name: /like/i });
    fireEvent.click(btnLike);
    fireEvent.click(btnLike);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
