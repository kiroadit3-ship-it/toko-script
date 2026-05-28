import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const orderId = 'INV' + Date.now(); 

    const pakasirRes = await fetch(`https://app.pakasir.com/api/transactioncreate/${body.method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project: process.env.PAKASIR_PROJECT_SLUG,
        order_id: orderId,
        amount: body.amount, 
        api_key: process.env.PAKASIR_API_KEY
      })
    });

    const result = await pakasirRes.json();
    if (!result.payment) {
      return NextResponse.json({ success: false, message: 'Gagal mendapatkan response Gateway' }, { status: 400 });
    }

    const { error: dbError } = await supabase.from('transactions').insert([{
      order_id: orderId,
      nama: body.nama,
      wa: body.wa,
      amount: body.amount,
      fee: result.payment.fee,
      total_payment: result.payment.total_payment,
      payment_method: result.payment.payment_method,
      payment_number: result.payment.payment_number,
      expired_at: result.payment.expired_at,
      status: 'pending'
    }]);

    if (dbError) throw dbError;
    return NextResponse.json({ success: true, order_id: orderId });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}