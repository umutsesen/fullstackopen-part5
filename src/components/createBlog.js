import React, { useState, useRef } from 'react'
import createblog from '../services/blogs'
import Toggle from '../utils/toggle'
import blogService from '../services/blogs'


export default function CreateBlog({ setErrormessage, setBlogs }) {
  const blogFormRef = useRef()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleSubmit = async (event) => {
    blogFormRef.current.toggleVisibility()
    event.preventDefault()
    try {
      await createblog.createBlog({ title, author, url })
      setBlogs(await blogService.getAll())
      setTitle('') /// does not work find out why
      setAuthor('')
      setUrl('')
      setErrormessage(` Your blog with ${title}title has been added to the list `)
      setTimeout(() => {
        setErrormessage(null)
      }, 5000)

    }
    catch (exception) {
      setErrormessage(` Could not create blog with ${title} title, it already exists! `)
      setTimeout(() => {
        setErrormessage(null)
      }, 5000)
    }
  }
  return (
    <div>
      <Toggle buttonLabel={'Create a new Blog'} ref={blogFormRef}>
        <h2> Create a new blog </h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label><input type='text' value={title} id='title' onChange={({ target }) => setTitle(target.value)} name='title'></input><br></br>
          <label>Author:</label><input type='text' value={author} id='author' onChange={({ target }) => setAuthor(target.value)} name='author'></input><br></br>
          <label>Url:</label><input type='text' value={url} id='url' onChange={({ target }) => setUrl(target.value)} name='url'></input><br></br>
          <button type='submit'>Create</button>
        </form>
      </Toggle>

    </div>
  )
}
