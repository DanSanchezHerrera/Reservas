import ReservePage from './pages/ReservePage'
import UpdatePage from './pages/UpdatePage'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import SignIn from './pages/SignIn.jsx'
import Dashboard from './pages/Dashboard'
import { ReservationsProvider } from './contexts/ReservationsContext'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// <Route path="/update/:id" element={<UpdatePage />} />

function App() {

  return (
    <ReservationsProvider>
      <BrowserRouter>
      <Navbar />
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reserve" element={<ReservePage />} />
          <Route path="/update" element={<UpdatePage />} />
          <Route path="/register" element={<SignIn /> } />
          
        </Routes>
      </BrowserRouter>
    </ReservationsProvider>
  )
}

export default App
