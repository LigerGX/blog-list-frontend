import { useState } from 'react'

const Blog = ({ blog, user, likeBlog, removeBlog }) => {
  const [view, setView] = useState(false)

  const toggleView = () => {
    setView(!view)
  }

  const viewStyle = {
    display: ''
  }

  const hideStyle = {
    display: 'none'
  }

  return (
    <li className={'blogContainer'}>
      <div>
        <h2><span className="blogTitle">{blog.title}</span> by <span className="blogAuthor">{blog.author}</span></h2>
        <button onClick={toggleView}>{view ? 'Hide' : 'View'}</button>
      </div>
      <div style={view ? viewStyle : hideStyle}>
        <p className="blogUrl">Url: {blog.url}</p>
        <div>
          <p className="blogLikes">Likes: {blog.likes} <span><button onClick={() => likeBlog(blog)}>Like</button></span></p>
        </div>
        <p>Submitted by: {blog.user.username}</p>
        <button
          style={user.username !== blog.user.username ? hideStyle : viewStyle}
          onClick={() => removeBlog(blog)}
        >
          Remove
        </button>
      </div>
    </li>
  )
}

export default Blog