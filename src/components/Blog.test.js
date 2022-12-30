import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('blog title and author are rendered by default but not url and likes', async () => {
  const blog = {
    title: 'Test Exclusive Blog',
    author: 'Test God',
    url: 'reacttester.com',
    likes: 487,
    user: {
      username: 'MockUser'
    }
  }

  const user = {
    username: 'MockUser'
  }

  render(<Blog blog={blog} user={user} />)

  const blogTitle = await screen.findByText(`${blog.title}`)
  const blogAuthor = await screen.findByText(`${blog.author}`)
  const blogUrl = screen.queryByText(`${blog.url}`)
  const blogLikes = screen.queryByText(`${blog.likes}`)

  expect(blogTitle).toBeDefined()
  expect(blogAuthor).toBeDefined()
  expect(blogUrl).toBeNull()
  expect(blogLikes).toBeNull()
})

test('blog url and likes are revealed when pressing view button', async () => {
  const blog = {
    title: 'Test Exclusive Blog',
    author: 'Test God',
    url: 'reacttester.com',
    likes: 487,
    user: {
      username: 'MockUser'
    }
  }

  const user = {
    username: 'MockUser'
  }

  render(<Blog blog={blog} user={user} />)

  const button = screen.getByRole('button', { name: 'View' })
  userEvent.click(button)

  const blogUrl = screen.getByText(`${blog.url}`, { exact: false })
  const blogLikes = screen.getByText(`${blog.likes}`, { exact: false })

  expect(blogUrl).toBeDefined()
  expect(blogLikes).toBeDefined()
})

test('if like button is clicked twice, event handler is called twice', async () => {
  const blog = {
    title: 'Test Exclusive Blog',
    author: 'Test God',
    url: 'reacttester.com',
    likes: 487,
    user: {
      username: 'MockUser'
    }
  }

  const user = {
    username: 'MockUser'
  }

  const likeBlog = jest.fn()
  const eventUser = userEvent.setup()

  render(<Blog blog={blog} user={user} likeBlog={likeBlog} />)

  const viewButton = screen.getByRole('button', { name: 'View' })
  await eventUser.click(viewButton)

  const likeButton = screen.getByText('Like')
  expect(likeButton).toBeDefined()
  await eventUser.click(likeButton)
  await eventUser.click(likeButton)

  expect(likeBlog.mock.calls.length).toBe(2)
})