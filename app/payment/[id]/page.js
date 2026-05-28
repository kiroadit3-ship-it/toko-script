'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentInstructionPage({ params }) {
  const router = useRouter();
  
  // Buka (unwrap) params menggunakan React.use()
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/check-status?id=${id}`)
      .then(res => res.json())
      .then(res => setData(res.data));
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/api/check-status?id=${id}`)
        .then(res => res.json())
        .then(res => {
          if (res.data?.status === 'completed') {
            clearInterval(interval);
            router.push(`/success/${id}`);
          }
        });
    }, 3000);
    return () => clearInterval(interval);
  }, [id, router]);

  if (!data) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="font-bold text-slate-500 animate-pulse">Menyiapkan instruksi pembayaran...</p>
    </div>
  );

  const isQris = data.payment_method === 'qris';
  const qrImageUrl = isQris ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data.payment_number)}&margin=10` : null;

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden text-center">
        
        <div className="bg-slate-900 p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Selesaikan Pembayaran</h2>
          <p className="text-slate-400 text-sm">Pesanan akan otomatis terkonfirmasi.</p>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-2">Total Tagihan</p>
            <p className="text-4xl sm:text-5xl font-black text-blue-600 tracking-tight">
              Rp {Number(data.total_payment).toLocaleString('id-ID')}
            </p>
          </div>

          {isQris ? (
            <div className="mb-8">
              <div className="inline-block p-4 bg-white rounded-2xl shadow-sm border border-slate-200">
                <img src={qrImageUrl} alt="QRIS" className="w-64 h-64 mx-auto rounded-lg" />
              </div>
              <p className="mt-6 text-sm text-slate-500">Buka aplikasi E-Wallet atau M-Banking Anda,<br/>lalu scan QR Code di atas.</p>
            </div>
          ) : (
            <div className="mb-8">
              <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-2">
                Virtual Account ({data.payment_method.toUpperCase().replace('_VA', '')})
              </p>
              <div className="bg-slate-50 py-4 px-6 rounded-xl border border-slate-200 inline-block">
                <p className="text-3xl font-mono font-bold tracking-widest text-slate-800">
                  {data.payment_number}
                </p>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <p className="text-sm font-semibold text-blue-800">
              Menunggu pembayaran Anda...
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}