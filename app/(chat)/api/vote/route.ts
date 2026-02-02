// UI Development Mode: Return empty votes
export async function GET() {
  return Response.json([], { status: 200 });
}

export async function PATCH() {
  return new Response("Message voted (demo)", { status: 200 });
}
