import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Blogform from "./components/Blogform";
import Loginform from "./components/Loginform";
import Toggalable from "./components/Toggalable";
import blogService from "./services/blogs";
import login from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);
  const handleLogin = async (e, username, password) => {
    e.preventDefault();
    try {
      const userdata = await login(username, password);
      setUser(userdata);
      window.localStorage.setItem("loggedUser", JSON.stringify(userdata));
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage({ type: "error", message: error.response.data.error });
      window.setTimeout(() => setMessage(null), 2000);
      console.log(error.response.data.error);
    }
  };
  const handleLogout = () => {
    setUser(null);
    setMessage({ type: "notification", message: "logout successfully" });
    window.setTimeout(() => setMessage(null), 2000);
    window.localStorage.removeItem("loggedUser");
  };
  const notification = (msg) => {
    if (!msg) {
      return;
    }
    return (
      <div className={msg.type === "error" ? "error" : "notification"}>
        {msg.message}
      </div>
    );
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    const token = user.token;
    blogFormRef.current.visibleToggle();
    try {
      const savedBlog = await blogService.create(newBlog, token);
      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogs(blogs.concat(savedBlog));
      setMessage({
        type: "notification",
        message: `A new blog ${savedBlog.title} by ${savedBlog.author} added.`,
      });
      window.setTimeout(() => setMessage(null), 2000);
    } catch (error) {
      setMessage({ type: "error", message: error.message });
      window.setTimeout(() => setMessage(null), 2000);
      console.log(error.message);
    }
  };
  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      if (!user) {
        setMessage({
          type: "error",
          message: "invalid user, login to delete blog",
        });
        window.setTimeout(() => setMessage(null), 2000);
      } else {
        blogService.remove(blog.id, user.token);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      }
    }
  };
  const handleUpdate = (blog) => {
    blog = { ...blog, likes: ++blog.likes };
    blogService.update(blog);
    setBlogs(blogs.map((b) => (b.id === blog.id ? blog : b)));
  };
  return (
    <>
      <h2>{!user ? "Login to application" : "Blogs"}</h2>
      {notification(message)}
      {!user ? (
        <Loginform
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <label>{user.name} logged in</label>
          <button onClick={handleLogout}>logout</button>
          <Toggalable ref={blogFormRef} btn1="cancle" btn2="create new blog">
            <Blogform
              handleCreate={handleCreate}
              title={title}
              author={author}
              url={url}
              setTitle={setTitle}
              setAuthor={setAuthor}
              setUrl={setUrl}
            />
          </Toggalable>
        </div>
      )}
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))}
      </div>
    </>
  );
};

export default App;
