import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_IPIFY_API_KEY;

  try {
    if (apiKey) {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}`,
        { cache: 'no-store' }
      );
      
      if (!response.ok) {
        // Fallback to simple IP if geo fails
        throw new Error('Geo API failed');
      }
      
      const data = await response.json();
      return NextResponse.json({ ip: data.ip });
    } else {
      const response = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('IP API failed');
      }
      const data = await response.json();
      return NextResponse.json({ ip: data.ip });
    }
  } catch (error) {
    // Attempt fallback if apiKey method failed
    try {
      const fallbackResponse = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' });
      if (fallbackResponse.ok) {
        const data = await fallbackResponse.json();
        return NextResponse.json({ ip: data.ip });
      }
    } catch (e) {
      // Ignore fallback error
    }
    
    console.error("Failed to fetch IP:", error);
    return NextResponse.json({ error: "Failed to fetch IP" }, { status: 500 });
  }
}
