import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleClick = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))
  }

  const likeBlog = async (blog) => {
    const updateObject = {
      likes: blog.likes + 1,
    }

    await blogService.update(updateObject, blog.id)

    const updatedBlogs = blogs.map(item => {
      if (item === blog) {
        return { ...blog, likes: blog.likes + 1 }
      }

      return item
    })

    setBlogs(updatedBlogs)
  }

  const removeBlog = async (blog) => {
    const confirm = window.confirm(`Delete blog: ${blog.title}`)
    if (confirm) {
      try {
        await blogService.remove(blog.id)
        const filteredBlogs = blogs.filter(item => item !==blog)
        setBlogs(filteredBlogs)
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  if (user === null) {
    return (
      <Login
        user={user}
        setUser={setUser}
        setToken={blogService.setToken}
        setNotification={setNotification}
        notification={notification}
      />
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      {notification && <Notification notification={notification} />}
      <div className="loggedInStatus">
        <p>{user.name} is logged in</p>
        <button onClick={handleClick}>Logout</button>
      </div>
      <Toggleable showButton='New Blog' hideButton='Cancel' ref={blogFormRef}>
        <AddBlog
          setNotification={setNotification}
          addBlog={addBlog}
        />
      </Toggleable >
      <ul className='blogList'>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
          />
        )}
      </ul>
    </div>
  )
}

export default App
