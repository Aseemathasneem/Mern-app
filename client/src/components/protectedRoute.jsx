import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function ProtectedRoute() {
    const {currentUser} = useSelector(state => state.user)
  return currentUser ? <Navigate to='/'/> :<Outlet/>
}