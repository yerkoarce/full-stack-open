import React from 'react'

const LoginForm = ({ 
  handleLogin, 
  username, 
  setUsername, 
  password, 
  setPassword
}) => {


  return (
    <form onSubmit={ handleLogin }>
        <div>
          <label htmlFor="username">
            Username: 
          </label>
          <input 
            type="text"
            value={ username }
            name='username'
            onChange={ ({ target }) => setUsername(target.value) }
          />
        </div>
        <div>
          <label htmlFor="password">
            Password: 
          </label>
          <input 
            type="password"
            value={ password }
            name='password'
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </div>
        <button type='submit' >
          Login
        </button>
      </form>
  )
}

export default LoginForm