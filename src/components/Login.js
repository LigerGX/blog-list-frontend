import { useState } from 'react'
import loginService from '../services/login'
import Notification from './Notification'

const Login = ({ setUser, setToken, setNotification, notification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (event) => {
    const target = event.target
    target.name === 'username'
      ? setUsername(target.value)
      : setPassword(target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setToken(user.token)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (exception) {
      setNotification({
        message: 'Invalid username or password',
        class: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in to application</h2>
      {notification && <Notification notification={notification} />}
      <label name="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={handleChange}
      />
      <br />
      <label name="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={handleChange}
      />
      <br />
      <button id="login-button" type="submit">Login</button>
    </form>
  )
}

export default Login