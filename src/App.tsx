import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom'

import './App.css'
import DashboardLayout from './layouts/DashboardLayout'
import './styles/globals.css'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Cards from './pages/Cards/Cards'
import Transactions from './pages/Transactions/Transactions'
import Analytics from './pages/Analytics/Analytics'
import Budget from './pages/Budget.tsx/Budget'
import Settings from './pages/Settings-Page/Settings'

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Dashboard />} />
          <Route path="cards" element={<Cards />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="budget" element={<Budget />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
