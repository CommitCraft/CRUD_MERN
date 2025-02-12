import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import User from './getuser/User'
import AddUser from './adduser/AddUser'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    <Routes>
    <Route path="/" element={<User />} />
    <Route path="/add" element={<AddUser />} />
    {/* other routes */}
    </Routes>
    </Router>
    </>
  )
}

export default App
