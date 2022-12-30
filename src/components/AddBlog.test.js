import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import AddBlog from './AddBlog'

test('can call event handler', async () => {
  const addBlog = jest.fn()
  const setNotification = jest.fn()
  const user = userEvent.setup()

  render(<AddBlog addBlog={addBlog} setNotification={setNotification} />)

  const titleInput = screen.getByLabelText('Title:')
  const authorInput = screen.getByLabelText('Author:')
  const urlInput = screen.getByLabelText('Url:')
  const submitButton = screen.getByRole('button', { name: 'Add Blog' })

  await user.type(titleInput, 'I hate tests')
  await user.type(authorInput, 'Test Hater')
  await user.type(urlInput, 'abolishtests.co.eu')
  await user.click(submitButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toEqual({
    author: 'Test Hater',
    title: 'I hate tests',
    url: 'abolishtests.co.eu',
  })
})