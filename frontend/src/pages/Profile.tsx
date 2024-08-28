import { useUserContext } from "../contexts/UserContext"
import ProductForm from "../components/products/ProductForm"
import useDialog from "../hooks/useDialog"
import StoreNameForm from "../components/StoreNameForm"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useUserContext()
  const { dialogRef, setIsOpen } = useDialog()

  const displayName = user?.first_name ? `${user?.first_name} ${user?.last_name}` : user?.email
  return (
    <>
      <div className="bg-white p-4 rounded">
        <div className="flex items-center justify-between">
          <h2>{user?.seller ? user.store_name : displayName}</h2>
          {user?.seller ? (
            <>
              <button
                className="bg-orange-400 text-white px-4 py-1 rounded"
                onClick={() => {
                  setIsOpen(true)
                }}
              >
                Create Product
              </button>
              <ProductForm dialogRef={dialogRef} setIsOpen={setIsOpen} />
            </>
          ) : (
            <>
              <button
                className="bg-yellow-400 text-white px-4 py-1 rounded"
                onClick={() => {
                  setIsOpen(true)
                }}
              >
                Make Seller Account
              </button>
              <StoreNameForm dialogRef={dialogRef} setIsOpen={setIsOpen} />
            </>
          )}
        </div>
        <ToastContainer autoClose={1500} position='top-left' />
      </div>
      <div className="grid grid-cols-2 mt-4 bg-white p-4">
        <div>
          <h2 className="font-semibold mb-2">User Details</h2>
          <p>First Name: <span>{user?.first_name}</span></p>
          <p>Last Name: <span>{user?.last_name}</span></p>
          <p>Email: <span>{user?.email}</span></p>
          <p>Phone Number: <span>{user?.phone}</span></p>
          <p>Store Name: <span>{user?.store_name}</span></p>
          <Link to='/edit-user' className="bg-yellow-400 text-white rounded px-4 py-1 mt-4">Edit User</Link>
          <button className="bg-red-400 text-white rounded px-4 py-1 mt-4 ml-2">Delete User</button>
        </div>
        <div>
          <h2 className="font-semibold mb-2">User Address</h2>
          <p>House Number: <span>{user?.house_num}</span></p>
          <p>Street: <span>{user?.street}</span></p>
          <p>Barangay: <span>{user?.barangay}</span></p>
          <p>City: <span>{user?.city}</span></p>
          <p>Province: <span>{user?.province}</span></p>
        </div>
      </div>
    </>
  )
}
