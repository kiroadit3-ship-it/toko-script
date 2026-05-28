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
        
      if (!updateError) {git 
        // ============================================
        // KODE KIRIM PESAN KE WA
        // ============================================
        const waMessage = `Halo *${tx.nama}* 🎉\n\nPembayaran untuk pesanan *${order_id}* telah berhasil kami terima!\n\nBerikut adalah pesanan Anda:\n📦 Produk: Script Sistem Tabungan V.2\n💳 Total: Rp ${Number(tx.total_payment).toLocaleString('id-ID')}\n\n🔗 *Link Download:*\nhttps://link-rahasia-kamu.com/script-tabungan.zip\n\nPanduan instalasi sudah disertakan di dalam file ZIP. Jika ada kendala, silakan balas pesan ini.\n\nTerima kasih telah berbelanja di ScriptKuy!`;

        try {
          await fetch('https://bot-tele-production-a68b.up.railway.app/send-message', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    number: tx.wa,
    message: waMessage
  })
});
        } catch (waError) {
          console.error('Gagal menembak API Bot WA:', waError);
        }
        // ============================================
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    return NextResponse.json({ received: false, message: err.message }, { status: 500 });
  }
}