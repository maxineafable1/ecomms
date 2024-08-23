import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="max-w-screen-lg mx-auto my-8">
        <Outlet />
      </main>
    </>
  )
}
