import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('test blog', () => {
  test('renders content, but only title and author', () => {
    const blog = {
      title: 'this is test',
      author: 'Hoang Pham',
      url: 'google.com',
      likes: 3,
    }

    const component = render(<Blog blog={blog} />)

    expect(component.container).toHaveTextContent('this is test Hoang Pham')

    const div = component.container.querySelector('.blog')
    expect(div).not.toHaveTextContent('google.com')
    expect(div).not.toHaveTextContent('3')
  })

  test('author and likes are shown when button has been clicked', () => {
    const blog = {
      title: 'this is test',
      author: 'Hoang Pham',
      url: 'google.com',
      likes: 3,
    }

    const component = render(<Blog blog={blog} />)

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('google.com')
    expect(component.container).toHaveTextContent('3')
  })

  test('if like button is clicked twice, event handler is called twice', () => {
    const blog = {
      title: 'this is test',
      author: 'Hoang Pham',
      url: 'google.com',
      likes: 3,
    }

    const mockHanler = jest.fn()

    const component = render(<Blog blog={blog} updateBlog={mockHanler} />)

    const button = component.getByText('view')
    fireEvent.click(button)

    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)

    expect(mockHanler.mock.calls).toHaveLength(2)
  })
})
