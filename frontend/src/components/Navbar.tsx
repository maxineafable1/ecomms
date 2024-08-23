import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart  } from "react-icons/fa";
import { useState } from "react";
import UserForm from "./UserForm";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false)
  const [loginSigup, setLoginSigup] = useState<boolean | null>(null)

  return (
    <div className="grid gap-1">
      <div>
        <div className="flex gap-4 max-w-screen-lg mx-auto text-xs text-gray-600">
          <button
            onClick={() => {
              setIsLogin(true)
              setLoginSigup(true)
            }} 
            className="ml-auto uppercase"
          >
            Login
          </button>
          <button 
            onClick={() => {
              setIsLogin(true)
              setLoginSigup(false)
            }} 
            className="uppercase"
          >
            Sign Up
          </button>
        </div>
      </div>
      <UserForm isLogin={isLogin} setIsLogin={setIsLogin} loginSigup={loginSigup} setLoginSigup={setLoginSigup} />
      <div className="bg-white p-4">
        <div className="flex gap-32 items-center max-w-screen-lg mx-auto">
          <Link to='/' className="mr-auto text-2xl">Ecommerce</Link>
          <form className="flex items-center relative w-full">
            <input
              type="input"
              className="bg-slate-200 px-4 py-2 text-sm outline-none w-full"
            />
            <span className="bg-orange-500 text-white absolute right-0 p-2.5">
              <FaSearch />
            </span>
          </form>
          <FaShoppingCart className="ml-auto text-6xl " />
        </div>
      </div>
    </div>
  )
}
