import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { Attend } from './views/Attend'
import { Login } from './views/Login'
import { Home } from './views/Home'
import { DialogProvider } from './providers/DialogProvider'
import { Nav } from './components/Nav/Nav'

function App() {
  return (
    <DialogProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attend" element={<Attend />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </DialogProvider>
  )
}

export default App
