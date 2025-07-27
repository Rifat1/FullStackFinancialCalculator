// frontend/src/app/api/cagr/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const startingValue = searchParams.get("startingValue");
  const endingValue = searchParams.get("endingValue");
  const years = searchParams.get("years");

  try {
    // Forward request to backend container
    const response = await fetch(`http://backend:8080/api/cagr?startingValue=${startingValue}&endingValue=${endingValue}&years=${years}`);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Unable to connect to backend" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
