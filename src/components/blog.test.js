import React, { useState } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// eslint-disable-next-line no-unused-vars
import { prettyDOM } from '@testing-library/dom'
import Toggle from '../utils/toggle'
import CreateBlog from './createBlog'

const Blog = ({ blog, trylike }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }



  return (
    <li className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>show</button>
      <div style={showWhenVisible} className="bloglikes">
        {blog.url} {blog.likes}
        <button onClick={trylike}>Like</button>
      </div>
    </li>
  )
}

describe('details', () => {
  test('renders title and author', () => {
    const blog = {
      title: 'testing55',
      author: 'Umut',
      url: 'test455454',
      likes: 31
    }

    const component = render(
      <Blog blog={blog}  />
    )

    expect(component.container).toHaveTextContent(
      'testing55 Umut'
    )
  })
  test('check url and title if hidden first', () => {
    const blog = {
      title: 'testing55',
      author: 'Umut',
      url: 'test455454',
      likes: 31
    }

    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container.querySelector('.bloglikes')).toHaveStyle('display: none')

  })
  test('check url and title if display changes when after button click', () => {
    const blog = {
      title: 'testing55',
      author: 'Umut',
      url: 'test455454',
      likes: 31
    }

    const component = render(
      <Blog blog={blog} />
    )
    const button = component.getByText('show')
    fireEvent.click(button)

    expect(component.container.querySelector('.bloglikes')).not.toHaveStyle('display: none')

  })

  test('check if like button works after two clicks', () => {
    const blog = {
      title: 'testing55',
      author: 'Umut',
      url: 'test455454',
      likes: 31
    }
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} trylike={mockHandler} />
    )
    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
  test('check if it receives props true', () => {
    const createnote = jest.fn()
    const component = render(
      <CreateBlog createnote={createnote}/>
    )
    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    fireEvent.change(title, { target: { value: 'busestar' } })
    fireEvent.change(author, { target: { value: 'denemestar' } })
    fireEvent.change(url, { target: { value: 'delistar' } })
    fireEvent.submit(form)

    expect(createnote.mock.calls).toHaveLength(1)
    expect(createnote.mock.calls[0][0].title).toBe('busestar')
    expect(createnote.mock.calls[0][0].author).toBe('denemestar')
    expect(createnote.mock.calls[0][0].url).toBe('delistar')
  })

})






















describe('<Toggle />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Toggle buttonLabel="show...">
        <div className="testDiv" />
      </Toggle>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})