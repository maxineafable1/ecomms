import { useState } from "react"
import { useUserContext } from "../contexts/UserContext"
import { toast } from "react-toastify"

type StoreNameFormProps = {
  dialogRef: React.RefObject<HTMLDialogElement> 
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StoreNameForm({ dialogRef, setIsOpen }: StoreNameFormProps) {
  const { setUserStoreName } = useUserContext()
  const [storeName, setStoreName] = useState('')

  return (
    <dialog ref={dialogRef} className="bg-white p-4 rounded">
      <form className="grid gap-4" onSubmit={e => {
        if (!storeName) return
        setUserStoreName(e, storeName)
        setIsOpen(false)
        toast.success('Account is now seller')
      }}>
        <input
          type="text"
          id="store_name"
          name="store_name"
          placeholder="Enter store name"
          className="bg-gray-100 px-4 py-1"
          value={storeName}
          onChange={e => setStoreName(e.target.value)}
          autoFocus
          required
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex-1 bg-red-400 text-white py-1 rounded"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button type="submit" className="flex-1 bg-yellow-400 text-white py-1 rounded">Submit</button>
        </div>
      </form>
    </dialog>
  )
}
