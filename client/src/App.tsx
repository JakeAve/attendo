import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { Login } from './views/Login'
import { Home } from './views/Home'
import { DialogProvider } from './providers/DialogProvider'
import { Nav } from './components/Nav/Nav'
import { AttendSession } from './views/AttendSession'
import { routes } from './routes'

function App() {
  return (
    <DialogProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.attendSession} element={<AttendSession />} />
          <Route
            path={routes.attendSessionWithAttendanceCode}
            element={<AttendSession />}
          />
          <Route path={routes.login} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </DialogProvider>
  )
}

export default App
