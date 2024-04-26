import ReservePage from './pages/ReservePage'
import UpdatePage from './pages/UpdatePage'
import Register from './components/Register'
import Home from './pages/Home'
import SignIn from './pages/SignIn.jsx'
import Dashboard from './pages/Dashboard'
import { ReservationsProvider } from './contexts/ReservationsContext'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <ReservationsProvider>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reserve" element={<ReservePage />} />
          <Route path="/update/:id" element={<UpdatePage />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </ReservationsProvider>
  )
}

export default App;
