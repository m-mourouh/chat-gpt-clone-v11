import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { question } = await request.json();
  const res = await fetch("https://mmourouh.pythonanywhere.com/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input_text: question }),
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
