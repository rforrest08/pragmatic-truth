import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { turnstileToken, ...formData } = body;

    // Verify Turnstile Token
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA'}&response=${turnstileToken}`
    });
    
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return NextResponse.json({ error: "Bot verification failed. Please try again." }, { status: 400 });
    }

    // Process the exact message functionality (placeholder)
    console.log("Q&R form submission:", formData);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Q&R API error:", error);
    return NextResponse.json({ error: "Server error occurred." }, { status: 500 });
  }
}
