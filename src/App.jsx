import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Order from './pages/order'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/order" element={<Order />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
