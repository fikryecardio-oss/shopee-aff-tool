import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { product, tone, target, includeProsCons } = await request.json();

    const prompt = `Buat review produk yang ${tone || 'jujur dan informatif'} untuk ${target || 'pengguna umum'}:

Produk: ${product?.name || 'Produk'}
Harga: Rp ${product?.price?.toLocaleString('id-ID') || '0'}

Buat review yang:
- Minimal 150 kata
- Jujur dan tidak clickbait
- Sertakan pengalaman penggunaan
${includeProsCons ? '- Sertakan kelebihan dan kekurangan' : ''}
- Gunakan bahasa Indonesia yang natural

Format:
🔍 Review [Nama Produk]

[Paragraf review]

${includeProsCons ? '✅ Kelebihan:\n- [point 1]\n- [point 2]\n\n⚠️ Kekurangan:\n- [point 1]' : ''}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 1024,
    });

    const review = completion.choices[0]?.message?.content || '';

    return NextResponse.json({ 
      review,
      success: true 
    });
  } catch (error) {
    console.error('AI Error:', error);
    return NextResponse.json(
      { error: 'Gagal generate review', success: false },
      { status: 500 }
    );
  }
}