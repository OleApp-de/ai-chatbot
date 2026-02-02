// UI Development Mode: Return empty suggestions
export async function GET() {
  return Response.json([], { status: 200 });
}
