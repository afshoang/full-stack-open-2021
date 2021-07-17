import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> should submit right detail when event handler create blog was call', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm handleAddBlog={createBlog} />)

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'this is title blog' },
  })
  fireEvent.change(authorInput, {
    target: { value: 'Hoang Pham' },
  })
  fireEvent.change(urlInput, {
    target: { value: 'this is url blog' },
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'this is title blog',
    author: 'Hoang Pham',
    url: 'this is url blog',
  })
})
