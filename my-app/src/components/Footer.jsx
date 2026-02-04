import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-indigo-950" >
      <div className=" max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-white">

        <div>
          <h2 className="text-lg font-bold text-white mb-2">
            DoubtSolver
          </h2>
          <p>
            A student-friendly platform to ask doubts and get clear answers.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/doubts">My Doubts</Link></li>
            <li><Link href="/profile">Profile</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">Account</h3>
          <ul className="space-y-1">
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/register">Register</Link></li>
            <li><Link href="/admin">Admin</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t text-center py-4 text-xs text-gray-500">
         {new Date().getFullYear()} DoubtSolver
      </div>
     </div> 
  );
}

