import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { order_id, amount, status } = body;
    
    const { data: tx, error: fetchError } = await supabase
      .from('transactions')
      .select('*')
      .eq('order_id', order_id)
      .single();
      
    if (fetchError || !tx) {
      return NextResponse.json({ received: true, error: 'Not Found' });
    }
    
    if (status === 'completed' && Number(tx.amount) === Number(amount)) {
      const { error: updateError } = await supabase
        .from('transactions')
        .update({ status: 'completed' })
        .eq('order_id', order_id);
        
      if (!updateError) {
        // ============================================
        // KODE KIRIM PESAN KE WA (SUDAH DIPERBAIKI)
        // ============================================
        const waMessage = `Halo *${tx.nama}* 🎉\n\nPembayaran untuk pesanan *${order_id}* telah berhasil kami terima!\n\nBerikut adalah pesanan Anda:\n📦 Produk: Script Sistem Tabungan V.2\n💳 Total: Rp ${Number(tx.total_payment || tx.amount).toLocaleString('id-ID')}\n\n🔗 *Link Download:*\nhttps://drive.google.com/drive/folders/1tEA2-8YCb1xuJZ0w6aUvtif7AuX-v_Ze?usp=sharing\n\nPanduan instalasi sudah disertakan di dalam file. Jika ada kendala, silakan balas pesan ini.\n\nTerima kasih telah berbelanja di ScriptKuy!`;

        try {
          const response = await fetch('https://bot-tele-production-a68b.up.railway.app/send-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              number: tx.wa,
              message: waMessage
            })
          });
          
          const data = await response.json();
          console.log('Respon Bot WA:', data);
        } catch (waError) {
          console.error("Gagal kirim WA:", waError);
        }
        // ============================================
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("ERROR UTAMA:", err);
    return NextResponse.json({ received: false, message: err.message }, { status: 500 });
  }
}
