import { useState, useEffect } from 'react'
import './index.css'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/hello`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
  }, [])

  return (
    <>
      <div>
        <h1>React Frontend</h1>
        <p>{message}</p>
      </div>
    </>
  )
}

export default App
