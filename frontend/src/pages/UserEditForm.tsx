import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUserContext } from "../contexts/UserContext"

export type UserEditFormType = {
  firstName: string
  lastName: string
  houseNumber: string
  street: string
  barangay: string
  city: string
  province: string
}

export default function UserEditForm() {
  const { user, updateUserInfo } = useUserContext()
  console.log(user)

  const [form, setForm] = useState<UserEditFormType>({
    firstName: user?.first_name ?? '',
    lastName: user?.last_name ?? '',
    houseNumber: user?.house_num ?? '',
    street: user?.street ?? '',
    barangay: user?.barangay ?? '',
    city: user?.city ?? '',
    province: user?.province ?? '',
  })

  const navigate = useNavigate()

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <section className="bg-white p-4 rounded">
      <form 
        onSubmit={e => {
          updateUserInfo(e, form)
          navigate('/profile')
        }}
        className="grid gap-4"
      >
        <div className="grid">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={form.firstName as string}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded"
            autoFocus
          />
        </div>
        <div className="grid">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={form.lastName as string}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded"
          />
        </div>
        <div className="grid">
          <label htmlFor="houseNumber">House Number</label>
          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            value={form.houseNumber}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded"
          />
        </div>
        <div className="grid">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            value={form.street}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded"
          />
        </div>
        <div className="grid">
          <label htmlFor="barangay">Barangay</label>
          <input
            type="text"
            id="barangay"
            name="barangay"
            value={form.barangay}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded"
          />
        </div>
        <div className="grid">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded"
          />
        </div>
        <div className="grid">
          <label htmlFor="province">Province</label>
          <input
            type="text"
            id="province"
            name="province"
            value={form.province}
            onChange={handleChange}
            className="border border-black px-2 py-1 rounded"
          />
        </div>
        <div className="flex mt-4 text-white gap-2">
          <Link to='/profile' className="flex-1 bg-yellow-400 text-center py-1 rounded">Go Back</Link>
          <button className="flex-1 bg-orange-400 rounded">Update</button>
        </div>
      </form>
    </section>
  )
}
