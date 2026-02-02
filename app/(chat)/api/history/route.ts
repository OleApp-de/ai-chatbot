// UI Development Mode: Return mock chat history
const mockChats = [
  {
    id: "chat-1",
    title: "Hilfe bei meinem Blogpost",
    createdAt: new Date().toISOString(),
    userId: "mock-user-id",
    visibility: "private",
    assistantId: "writing",
  },
  {
    id: "chat-2", 
    title: "React useEffect erklärt",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    userId: "mock-user-id",
    visibility: "private",
    assistantId: "code",
  },
  {
    id: "chat-3",
    title: "Marktanalyse Q4 2025",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    userId: "mock-user-id",
    visibility: "private",
    assistantId: "analysis",
  },
  {
    id: "chat-4",
    title: "Ideen für Logo-Design",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    userId: "mock-user-id",
    visibility: "private",
    assistantId: "creative",
  },
  {
    id: "chat-5",
    title: "Allgemeine Fragen",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    userId: "mock-user-id",
    visibility: "private",
    assistantId: "general",
  },
  {
    id: "chat-6",
    title: "Python Script debuggen",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    userId: "mock-user-id",
    visibility: "private",
    assistantId: "code",
  },
  {
    id: "chat-7",
    title: "Newsletter Text verfassen",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    userId: "mock-user-id",
    visibility: "private",
    assistantId: "writing",
  },
];

export async function GET() {
  return Response.json({
    chats: mockChats,
    hasMore: false,
  });
}

export async function DELETE() {
  // Mock delete for UI development
  return Response.json({ success: true }, { status: 200 });
}
