import { Routes, Route } from 'react-router'
import RegisterPage from './pages/register'
import MemberPage from './pages/member'
import MainLayout from './layouts/MainLayout'
import EditPage from './pages/edit'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MemberPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/members/:id" element={<EditPage />} />
      </Route>
    </Routes>
  )
}

export default App