import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-2xl font-bold">404 Page Not Found</h1>
      <p>This page does not exist</p>
      <Link
        to="/"
        className="text-white bg-orange-400 hover:bg-orange-500 rounded shadow px-4 py-1"
      >
        Go Back
      </Link>
    </div>
  )
}
