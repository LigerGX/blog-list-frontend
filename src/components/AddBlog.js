import { useState } from 'react'

const AddBlog = ({ setNotification, addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    try {
      addBlog(newBlog)
      setNotification({
        message: `${newBlog.title} by ${newBlog.author} added!`,
        class: 'success'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({
        message: exception.message,
        class: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleChange = (event) => {
    const target = event.target
    switch (target.name) {
    case 'title':
      setTitle(target.value)
      break

    case 'author':
      setAuthor(target.value)
      break

    case 'url':
      setUrl(target.value)
      break

    default:
      console.log('Error in switch case for add blog')
      break
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Blog</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          name="author"
          id="author"
          value={author}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="url">Url:</label>
        <input
          type="text"
          name="url"
          id="url"
          value={url}
          onChange={handleChange}
        />
      </div>

      <button id="add-blog-button" type="submit">Add Blog</button>
    </form>
  )
}

export default AddBlog