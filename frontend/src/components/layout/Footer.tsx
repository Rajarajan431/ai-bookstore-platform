import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        
        <div className="grid gap-8 md:grid-cols-3">
          
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold text-white">
              Bookstore
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              A modern platform to buy and sell books online.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 font-medium text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/books" className="hover:text-white">Books</Link></li>
              <li><Link href="/login" className="hover:text-white">Login</Link></li>
              <li><Link href="/register" className="hover:text-white">Register</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 font-medium text-white">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Bookstore. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
