import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { Attend } from './views/Attend'
import { Login } from './views/Login'
import { Home } from './views/Home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attend" element={<Attend />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
