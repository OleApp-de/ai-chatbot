// UI Development Mode: Return empty chat history
export async function GET() {
  // Return empty history for UI development
  return Response.json({
    chats: [],
    hasMore: false,
  });
}

export async function DELETE() {
  // Mock delete for UI development
  return Response.json({ success: true }, { status: 200 });
}
