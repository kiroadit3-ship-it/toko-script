'use client';
import { useEffect, useState, use } from 'react';

export default function SuccessPage({ params }) {
  // Buka (unwrap) params menggunakan React.use()
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/check-status?id=${id}`)
      .then(res => res.json())
      .then(res => setData(res.data));
  }, [id]);

  if (!data) return null;
  
  if (data.status !== 'completed') return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl font-bold border border-red-200">
        Akses Ditolak. Pembayaran belum diselesaikan.
      </div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center overflow-hidden">
        
        <div className="bg-green-500 p-10 text-white relative">
          <div className="w-20 h-20 bg-white text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-600/30">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-black mb-2">Pembayaran Berhasil!</h2>
          <p className="text-green-100 font-medium">Order ID: {data.order_id}</p>
        </div>

        <div className="p-8 sm:p-12">
          <p className="text-slate-600 mb-8 text-lg leading-relaxed">
            Terima kasih, <span className="font-bold text-slate-900">{data.nama}</span>! 🎉<br/>
            Pesanan Anda telah kami terima. Silakan unduh file script dan baca panduannya di bawah ini.
          </p>

          <div className="space-y-4">
            <a href="https://drive.google.com/drive/folders/1tEA2-8YCb1xuJZ0w6aUvtif7AuX-v_Ze?usp=sharing" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Download Script (.ZIP)
            </a>

            <a href="#" className="flex items-center justify-center gap-3 w-full bg-slate-50 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-100 border border-slate-200 transition-all active:scale-95">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              Baca Panduan Instalasi
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
