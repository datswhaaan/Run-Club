import { Routes, Route } from 'react-router'
import RegisterPage from './pages/register'
import MemberPage from './pages/member'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MemberPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/member" element={<div>Home</div>} />
      </Route>
    </Routes>
  )
}

export default App