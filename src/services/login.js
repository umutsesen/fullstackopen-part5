import axios from 'axios'
const loginUrl = '/api/login'


const login = async (userinfo)  => {
  const response = await axios.post(loginUrl, userinfo)
  return response.data
}


export default { login }