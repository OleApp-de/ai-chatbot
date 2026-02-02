import type { ArtifactKind } from "@/components/artifact";
import { ChatSDKError } from "@/lib/errors";

// In-memory storage for UI development
const mockDocuments = new Map<string, { id: string; content: string; title: string; kind: ArtifactKind; createdAt: Date }[]>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new ChatSDKError(
      "bad_request:api",
      "Parameter id is missing"
    ).toResponse();
  }

  const documents = mockDocuments.get(id) || [];
  
  if (documents.length === 0) {
    return new ChatSDKError("not_found:document").toResponse();
  }

  return Response.json(documents, { status: 200 });
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new ChatSDKError(
      "bad_request:api",
      "Parameter id is required."
    ).toResponse();
  }

  const {
    content,
    title,
    kind,
  }: { content: string; title: string; kind: ArtifactKind } =
    await request.json();

  const document = {
    id,
    content,
    title,
    kind,
    createdAt: new Date(),
  };

  const existing = mockDocuments.get(id) || [];
  existing.push(document);
  mockDocuments.set(id, existing);

  return Response.json(document, { status: 200 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new ChatSDKError(
      "bad_request:api",
      "Parameter id is required."
    ).toResponse();
  }

  mockDocuments.delete(id);
  return Response.json({ success: true }, { status: 200 });
}
