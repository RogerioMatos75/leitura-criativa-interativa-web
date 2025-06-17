import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { prompt, model } = await req.json();
        const apiKey = process.env.GOOGLE_GENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'API key não configurada.' }, { status: 500 });
        }

        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + (model || 'gemini-1.5-flash') + ':generateContent?key=' + apiKey, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            return NextResponse.json({ error: data.error?.message || 'Erro ao gerar conteúdo.' }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
    }
}
