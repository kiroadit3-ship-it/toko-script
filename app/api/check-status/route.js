import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ success: false }, { status: 400 });

  const { data: tx, error } = await supabase.from('transactions').select('*').eq('order_id', id).single();
  if (error || !tx) return NextResponse.json({ success: false }, { status: 404 });

  return NextResponse.json({ success: true, data: tx });
}