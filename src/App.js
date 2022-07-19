import { useState, useEffect } from "react";
import Blog from "./components/Blog";
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

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);
  const handleLogin = async (e) => {
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
  const loginForm = () => (
    <>
      <form onSubmit={handleLogin}>
        <h2>Login to application</h2>
        {notification(message)}
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="login" />
      </form>
    </>
  );
  const handleCreate = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    const token = user.token;
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
  const blogForm = () => (
    <>
      <h2>blogs</h2>
      {notification(message)}
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            type="text"
            id="url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
        </div>
        <input type="submit" value="Create" />
      </form>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
  return !user ? loginForm() : blogForm();
};

export default App;
