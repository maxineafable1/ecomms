import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "../../contexts/UserContext"

export default function PrivateRoutes() {
  const { tokens } = useUserContext()
  return tokens ? <Outlet /> : <Navigate to='/' />
}