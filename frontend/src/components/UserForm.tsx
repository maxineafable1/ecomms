import { useEffect, useRef } from "react"
import { IoMdClose } from "react-icons/io"

type UserFormProps = {
  isLogin: boolean
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
  loginSigup: boolean | null
  setLoginSigup: React.Dispatch<React.SetStateAction<boolean | null>>
}

export default function UserForm({ isLogin, setIsLogin, loginSigup, setLoginSigup }: UserFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (isLogin) {
      dialog?.showModal()
    }

    function closeModal(e: MouseEvent) {
      if (!dialog) return
      const dialogDimensions = dialog.getBoundingClientRect()
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close()
        setIsLogin(false)
      }
    }

    dialog?.addEventListener("click", closeModal)
    return () => {
      dialog?.removeEventListener('click', closeModal)
    }
  }, [isLogin])

  return (
    <dialog
      ref={dialogRef}
      className="p-4 rounded w-96"
    >
      <div className="flex items-center mb-8">
        <h2 className="mx-auto">{loginSigup ? 'Login' : 'Sign Up'}</h2>
        <IoMdClose onClick={() => {
          dialogRef.current?.close()
          setIsLogin(false)
        }} className="text-xl" />
      </div>
      <form className="grid gap-4">
        <input
          type="text"
          id="phoneOrEmail"
          placeholder="Enter your phone number or email"
          className="border border-black rounded px-4 py-2"
        />
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          className="border border-black rounded px-4 py-2"
        />
        <button className="bg-orange-500 text-white py-1 mt-8 rounded uppercase">Login</button>
      </form>
      <div className="mt-4 text-sm text-center">
        <span className="mr-1">Don't have an account?</span>
        <button
          onClick={() => setLoginSigup(prev => !prev)}
          className="text-blue-400"
        >
          Sign Up
        </button>
      </div>
    </dialog>
  )
}
