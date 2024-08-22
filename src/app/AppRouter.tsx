import { Route, Routes } from 'react-router-dom'
import Login from '../Login'
import App from '../App'
import ProtectedRoute from '../ProtectedRoute'

const AppRouter = () => {
  return (
    <Routes>
        <Route path='/auth' element={<Login/>}/>
        <Route path='/' element={<ProtectedRoute><App/></ProtectedRoute>}/>
    </Routes>
  )
}

export default AppRouter