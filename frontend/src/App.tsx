import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"
import PrivateRoutes from "./utilities/routes/PrivateRoutes"
import NotFound from "./pages/NotFound"
import UserEditForm from "./pages/UserEditForm"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="products/:id" element={<ProductDetails />} errorElement={<NotFound />} />
      <Route path="cart" element={<Cart />} />
      <Route element={<PrivateRoutes />}>
        <Route path='/profile' element={<Profile />} />
        <Route path="/edit-user" element={<UserEditForm />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
