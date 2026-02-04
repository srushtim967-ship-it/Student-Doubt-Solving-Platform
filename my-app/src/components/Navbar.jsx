import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="text-black bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          DoubtSolver
        </Link>

        <div className="flex gap-6 text-md font-medium">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link
            href="/register"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
