import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Loginform from './components/login'
import CreateBlog from './components/createBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [currentuser, setCurrentuser] = useState(null)
  const [errormessage, setErrormessage] = useState('')


  useEffect(() => {
    if (localStorage.getItem('loggedUser')) {
      const user = JSON.parse(localStorage.getItem('loggedUser'))
      setCurrentuser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    async function FetchBlogs() {
      const getAllBlogs = await blogService.getAll()
      setBlogs(getAllBlogs)
    }
    FetchBlogs()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('loggedUser')
    setCurrentuser(null)
  }

  const sortedblogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {errormessage}
      {currentuser === null ?
        <Loginform  setCurrentuser={setCurrentuser} setErrormessage={setErrormessage} />:
        <div><p>{currentuser.name} logged in <button onClick={handleLogout}>Logout</button></p>
          <CreateBlog setErrormessage={setErrormessage} setBlogs={setBlogs} blogs={blogs}/>
          <h2>blogs</h2>
          {sortedblogs.map(blog =>
            <Blog key={blog.id} blog={blog}  blogs={blogs} setBlogs={setBlogs} currentuser={currentuser} />
          )}</div>}
    </div>
  )
}

export default App