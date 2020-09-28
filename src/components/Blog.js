import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, currentuser, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const [buttonname, setButtonName] = useState('Show')
  const [like, setLike] = useState(blog.likes)

  const shownhide = { display: visible ? '' : 'none' }
  const buttonnamechange = () => visible ? setButtonName('Show') : setButtonName('Hide')

  const toggleVisibility = () => {
    setVisible(!visible)
    buttonnamechange()

  }

  const handleLike = async () => {
    blog.likes += 1
    const result = await blogService.changeLikes(blog)
    setLike(result.likes)
  }
  const handleRemove = async () => {
    const answer = window.confirm(`Are you sure? ${blog.title} by${blog.author} will be removed`)
    if (answer) {
      await blogService.removeBlog(blog.id)
      setBlogs(await blogService.getAll()) // easy

    }
  }

  return (
    <div style={blogStyle}>
    Title: {blog.title} <button onClick={toggleVisibility}>{buttonname}</button>
      <div style={shownhide}>
        <br></br>
      Author: {blog.author}
        <br></br>
      Url: {blog.url}
        <br></br>
        Likes: <span>{like}</span> <button onClick={handleLike}>Like</button>
        <br></br>
        {currentuser.username === blog.user.username ? <button onClick={handleRemove}>Remove Blog</button>: <br></br> }
      </div>
    </div>
  )
}

export default Blog
