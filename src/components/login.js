
import React, { useState } from 'react'
import loginService from '../services/login'
import createblog from '../services/blogs'
import Toggle from '../utils/toggle'
import PropTypes from 'prop-types'




export default function Loginform({ setCurrentuser, setErrormessage }) {
  const [username, setUsername] = useState('') // sunu password ve username birlesik maybe later
  const [password, setPassword] = useState('')
  const SubmitForm = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      createblog.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setCurrentuser(user)
      setUsername('')
      setPassword('')

    }
    catch (exception) {
      setErrormessage('Wrong credentials')
      setTimeout(() => {
        setErrormessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Toggle buttonLabel={'Log in'}>
        <h2>Log in to application</h2>
        <form onSubmit={SubmitForm}>
          <input type='text' id='username' name='username' onChange={({ target }) => setUsername(target.value)}></input>
          <input type='password' id='password' name='password' onChange={({ target }) => setPassword(target.value)}></input>
          <button type='submit' id="login-button">Login</button>
        </form>
      </Toggle>

    </div>
  )
}
Loginform.propTypes = {
  setErrormessage: PropTypes.func.isRequired,
  setCurrentuser: PropTypes.func.isRequired



}
