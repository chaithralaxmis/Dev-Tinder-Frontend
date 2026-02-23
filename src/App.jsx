
import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router'
import Register from './components/Register'
import Login from './components/Login'
import ProtectedRoute from './components/fixedComponents/protectedRoute'
import Feed from './components/Feed'
import Requests from './components/Requests'
import Profile from './components/Profile'
import Connections from './components/Connections'
function App() {
  return (
    <div className='bg-gradient-to-br from-black via-gray-800 to-black text-white min-h-screen min-w-screen'>
      <BrowserRouter>
        <Routes>
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route element={<ProtectedRoute isAuthenticated={true} />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
