import { useEffect, useRef, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { useUserContext } from "../contexts/UserContext"

type UserFormProps = {
  isLogin: boolean
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
  loginSigup: boolean | null
  setLoginSigup: React.Dispatch<React.SetStateAction<boolean | null>>
}

export type LoginFormType = {
  phoneOrEmail: string
  password: string
}

export type SignupFormType = {
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
}

export default function UserForm({ isLogin, setIsLogin, loginSigup, setLoginSigup }: UserFormProps) {
  const { login, signup } = useUserContext()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [form, setForm] = useState<LoginFormType>({
    phoneOrEmail: '',
    password: '',
  })

  const [signupForm, setSignupForm] = useState<SignupFormType>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  })

  function onChangeSignup(e: React.ChangeEvent<HTMLInputElement>) {
    setSignupForm({ ...signupForm, [e.target.id]: e.target.value })
  }

  function loginForm(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

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
      {loginSigup ? (
        <>
          <div className="flex items-center mb-8">
            <h2 className="mx-auto">Login</h2>
            <IoMdClose onClick={() => {
              dialogRef.current?.close()
              setIsLogin(false)
            }} className="text-xl" />
          </div>
          <form
            className="grid gap-4"
            onSubmit={e => {
              login(e, form)
              dialogRef.current?.close()
              setIsLogin(false)
            }}
          >
            <input
              type="text"
              id="phoneOrEmail"
              value={form.phoneOrEmail}
              onChange={loginForm}
              placeholder="Enter your phone number or email"
              className="border border-black rounded px-4 py-2"
              autoFocus
              required
            />
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={loginForm}
              placeholder="Enter your password"
              className="border border-black rounded px-4 py-2"
              required
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
        </>
      ) : (
        <>
          <div className="flex items-center mb-8">
            <h2 className="mx-auto">Sign Up</h2>
            <IoMdClose onClick={() => {
              dialogRef.current?.close()
              setIsLogin(false)
            }} className="text-xl" />
          </div>
          <form
            className="grid gap-4"
            onSubmit={e => {
              signup(e, signupForm)
              dialogRef.current?.close()
              setIsLogin(false)
            }}
          >
            <input
              type="text"
              id="firstName"
              value={signupForm.firstName}
              onChange={onChangeSignup}
              placeholder="Enter your first name"
              className="border border-black rounded px-4 py-2"
            />
            <input
              type="text"
              id="lastName"
              value={signupForm.lastName}
              onChange={onChangeSignup}
              placeholder="Enter your last name"
              className="border border-black rounded px-4 py-2"
            />
            <input
              type="text"
              id="phone"
              value={signupForm.phone}
              onChange={onChangeSignup}
              placeholder="Enter your phone number"
              className="border border-black rounded px-4 py-2"
            />
            <input
              type="email"
              id="email"
              value={signupForm.email}
              onChange={onChangeSignup}
              placeholder="Enter your email address"
              className="border border-black rounded px-4 py-2"
            />
            <input
              type="password"
              id="password"
              value={signupForm.password}
              onChange={onChangeSignup}
              placeholder="Enter your password"
              className="border border-black rounded px-4 py-2"
            />
            <button className="bg-orange-500 text-white py-1 mt-8 rounded uppercase">Sign Up</button>
          </form>
          <div className="mt-4 text-sm text-center">
            <span className="mr-1">Already have an account?</span>
            <button
              onClick={() => setLoginSigup(prev => !prev)}
              className="text-blue-400"
            >
              Sign In
            </button>
          </div>
        </>
      )}

    </dialog>
  )
}
