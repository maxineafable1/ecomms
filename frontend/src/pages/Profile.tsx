import { useState } from "react"
import { useUserContext } from "../contexts/UserContext"
import ProductForm from "../components/products/ProductForm"
import useDialog from "../hooks/useDialog"

export default function Profile() {
  const { user } = useUserContext()
  const { dialogRef, setIsOpen } = useDialog()

  const displayName = user?.first_name ? `${user?.first_name} ${user?.last_name}` : user?.email
  return (
    <div className="bg-white p-4 rounded">
      <div className="flex items-center justify-between">
        <h2>{displayName}</h2>
        {user?.seller && <button
          className="bg-orange-400 text-white px-4 py-1 rounded"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          Create Product
        </button>}
      </div>
      <ProductForm dialogRef={dialogRef} setIsOpen={setIsOpen} />
    </div>
  )
}
