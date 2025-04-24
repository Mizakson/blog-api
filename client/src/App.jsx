import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/hello')
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
