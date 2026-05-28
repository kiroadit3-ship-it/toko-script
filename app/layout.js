import './globals.css'

export const metadata = {
  title: 'Toko Script Digital',
  description: 'Platform Pembelian Produk Digital Berkualitas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-[#f8fafc] text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-blue-200">
        {/* Navbar Modern */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              ScriptKuy
            </div>
            <div className="text-sm font-medium text-slate-500 hidden sm:block">
              Aman & Terpercaya 🔒
            </div>
          </div>
        </nav>

        <main className="min-h-screen pb-20">
          {children}
        </main>
      </body>
    </html>
  )
}