'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PAYMENT_METHODS, calculateFee } from '@/lib/paymentMethods';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nama: '', wa: '' });
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0].id);
  
  const basePrice = 35000;
  const activeMethod = PAYMENT_METHODS.find(m => m.id === selectedMethod);
  const estimatedFee = calculateFee(basePrice, activeMethod);
  const totalPay = basePrice + estimatedFee;

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, method: selectedMethod, amount: basePrice })
      });
      const data = await res.json();
      
      if (data.success) {
        router.push(`/payment/${data.order_id}`);
      } else {
        alert("Gagal: " + data.message);
        setLoading(false);
      }
    } catch (error) {
      alert("Error sistem.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
        <p className="text-slate-500">Selesaikan pembelian Anda dengan aman.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* KIRI: Form Pengisian (Ambil 7 Kolom) */}
        <div className="xl:col-span-7 space-y-8">
          <form id="checkoutForm" onSubmit={handlePayment} className="space-y-8">
            
            {/* Informasi Kontak */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm">1</span>
                Informasi Kontak
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
                  <input type="text" required placeholder="Jhon Doe" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" 
                    onChange={e => setForm({...form, nama: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor WhatsApp Aktif</label>
                  <input type="text" required placeholder="08123456789" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" 
                    onChange={e => setForm({...form, wa: e.target.value})} 
                  />
                  <p className="mt-2 text-xs text-slate-500">Link download juga akan dikirimkan ke nomor ini.</p>
                </div>
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm">2</span>
                Metode Pembayaran
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PAYMENT_METHODS.map((method) => {
                  const fee = calculateFee(basePrice, method);
                  const isSelected = selectedMethod === method.id;
                  
                  return (
                    <label key={method.id} className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200'}`}>
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-600' : 'border-slate-300'}`}>
                            {isSelected && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
                          </div>
                        </div>
                        <div className="flex-1">
                          <span className="block font-bold text-slate-900 text-sm leading-tight">{method.name}</span>
                          <span className="block mt-1 text-xs text-slate-500 font-medium">Biaya Layanan: Rp {fee.toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Tombol Pay Mobile (Hanya muncul di HP) */}
            <div className="xl:hidden">
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 disabled:opacity-70 transition-all flex justify-center items-center gap-2">
                {loading ? (
                  <span className="animate-pulse">Memproses pesanan...</span>
                ) : (
                  <> Bayar <span className="font-black">Rp {totalPay.toLocaleString('id-ID')}</span> </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* KANAN: Ringkasan Order (Ambil 5 Kolom, Sticky) */}
        <div className="xl:col-span-5 relative">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl sticky top-24">
            <h3 className="text-xl font-bold mb-6 border-b border-slate-700 pb-4">Ringkasan Pesanan</h3>
            
            <div className="flex gap-4 mb-6">
              <div className="w-20 h-20 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center flex-shrink-0">
                 <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
              </div>
              <div>
                <p className="font-bold text-lg leading-tight">Script Sistem Tabungan V.2</p>
                <p className="text-slate-400 text-sm mt-1">Lisensi Full Code</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-300 border-b border-slate-700 pb-6 mb-6">
              <div className="flex justify-between">
                <span>Harga Produk</span>
                <span className="font-medium text-white">Rp {basePrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Layanan ({activeMethod.name.split(' ')[0]})</span>
                <span className="font-medium text-white">+ Rp {estimatedFee.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <span className="font-bold">Total Pembayaran</span>
              <span className="text-3xl font-black text-blue-400">Rp {totalPay.toLocaleString('id-ID')}</span>
            </div>

            {/* Tombol Pay Desktop */}
            <button form="checkoutForm" type="submit" disabled={loading} className="hidden xl:flex w-full bg-blue-500 text-white font-bold py-4 rounded-xl hover:bg-blue-400 disabled:opacity-70 transition-all justify-center items-center gap-2">
              {loading ? 'Memproses...' : 'Selesaikan Pembayaran'}
            </button>

            <p className="text-center text-xs text-slate-500 mt-6 flex items-center justify-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Pembayaran diamankan oleh Payment Gateway
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}