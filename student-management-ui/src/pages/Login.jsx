import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

function Login({ onLogin }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {

    e.preventDefault()

    if (!username || !password) {

      toast.error('All fields are required')

      return
    }

    if (
      username === 'admin' &&
      password === 'admin123'
    ) {

      toast.success('Login Successful')

      setTimeout(() => {
        onLogin()
      }, 1000)

    } else {

      toast.error('Invalid Credentials')
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: '#f5f7fb' }}
    >

      <ToastContainer />

      <div className="card border-0 shadow p-5 rounded-4" style={{ width: '400px' }}>

        <h2 className="text-center fw-bold mb-4">
          Student Management Login
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Username
            </label>

            <input
              type="text"
              className="form-control rounded-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

          </div>

          <div className="mb-4">

            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control rounded-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <button className="btn btn-success w-100 rounded-3">
            Login
          </button>

        </form>

      </div>
    </div>
  )
}

export default Login