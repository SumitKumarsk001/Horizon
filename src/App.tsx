import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom'
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Cards = lazy(() => import("./pages/Cards/Cards"));
const Transactions = lazy(() => import("./pages/Transactions/Transactions"));
const Analytics = lazy(() => import("./pages/Analytics/Analytics"));
const Budget = lazy(() => import("./pages/Budget.tsx/Budget"));
const Settings = lazy(() => import("./pages/Settings-Page/Settings"));
import PageSkeleton from "./components/Skeleton/PageSkeleton";
import { useAppSelector } from './hooks/reduxHooks'

function App() {

  const isLoggedIn = useAppSelector(
    (state) => state.auth.isLoggedIn
  );

  return (
    <BrowserRouter>
    <Suspense fallback={<PageSkeleton/>}>
      <Routes>

        <Route
          path="/"
          element={
            isLoggedIn
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/login" replace />
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            isLoggedIn
              ? <DashboardLayout />
              : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="cards" element={<Cards />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="budget" element={<Budget />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App
