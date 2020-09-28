import axios from 'axios'
const blogsUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async ()  => {
  const request = await axios.get(blogsUrl)
  return request.data
}

const createBlog = async (newblog) => {
  const config = {
    headers: { Authorization: token },
  }
  const respond = await axios.post(blogsUrl, newblog, config)
  return respond.data
}

const changeLikes = async (info) => {
  const editurl = `/api/blogs/${info.id}`
  const respond = await axios.put(editurl, info)
  return respond.data
}
const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const editurl = `/api/blogs/${id}`
  const respond = await axios.delete(editurl, config)
  return respond.data

}



export default { getAll, createBlog, changeLikes, removeBlog, setToken }