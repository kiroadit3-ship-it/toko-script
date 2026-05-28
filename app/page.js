import Link from 'next/link';

export default function ProductPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* KIRI: Gambar Produk Asli */}
          <div className="relative bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-100 flex items-center justify-center overflow-hidden">
            <img 
              src="/produk-banner.png" 
              alt="Promo Sistem Tabungan Siswa V.2" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            {/* Badge Produk Digital Melayang di atas gambar */}
            <div className="absolute top-6 left-6">
              <span className="bg-blue-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-lg border border-blue-400/50">
                Produk Digital
              </span>
            </div>
            {/* Badge Diskon */}
            <div className="absolute top-6 right-6">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-red-500/40 animate-pulse">
                Promo Spesial -76%
              </span>
            </div>
          </div>

          {/* KANAN: Informasi & Beli */}
          <div className="p-8 lg:p-14 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Lisensi Source Code</h1>
            <p className="text-slate-500 mb-8">Dapatkan akses instan ke source code lengkap beserta tutorial instalasi langkah demi langkah.</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-slate-700">
                <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>Full Source Code (Frontend & Backend)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>Panduan Instalasi PDF Lengkap</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span>Free Update Minor (Bug Fixes)</span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-8 mt-auto">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Total Harga</p>
                  <div className="flex items-end gap-2.5">
                    {/* Harga Coret */}
                    <span className="text-sm font-bold text-slate-400 line-through decoration-red-500/70 mb-1">
                      Rp 150.000
                    </span>
                    {/* Harga Baru */}
                    <span className="text-lg font-black text-slate-900">
                      Rp 35.000
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-xs font-bold px-2.5 py-1 rounded-md">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                    Sisa 1 Stok
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all active:scale-[0.98]">
                Beli Sekarang 
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}