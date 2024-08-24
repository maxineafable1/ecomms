import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "../../contexts/UserContext"

export default function PublicRoutes() {
  const { tokens } = useUserContext()
  return !tokens ? <Outlet /> : <Navigate to='/' />
}