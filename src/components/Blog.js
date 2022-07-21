import Toggalable from "./Toggalable";
const Blog = ({ blog, handleDelete, handleUpdate }) => {
  const blogStyle = {
    border: "1px solid",
    padding: "5px",
  };
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Toggalable btn1="hide" btn2="view">
        <p>{blog.url}</p>
        <p>
          Likes {blog.likes}{" "}
          <button onClick={() => handleUpdate(blog)}>like</button>
        </p>
        <p>{blog.author}</p>
        <button onClick={() => handleDelete(blog)}>remove</button>
      </Toggalable>
    </div>
  );
};
export default Blog;
