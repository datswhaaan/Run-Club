import { Routes, Route } from 'react-router'
import RegisterPage from './pages/register/page'
import MemberPage from './pages/member/page'
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