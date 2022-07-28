const Blogform = ({
  handleCreate,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  return (
    <>
      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            placeholder="author"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            type="text"
            id="url"
            placeholder="url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default Blogform;
