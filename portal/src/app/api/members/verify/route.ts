import { findPublicMember } from "@/lib/institutional-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const memberId = searchParams.get("memberId") ?? "";

  if (memberId.trim().length < 6) {
    return Response.json(
      { found: false, message: "Enter a complete NIMENA membership number." },
      { status: 400 },
    );
  }

  const member = findPublicMember(memberId);
  if (!member) {
    return Response.json({
      found: false,
      message: "No publicly verifiable active membership record was found for that number.",
    });
  }

  return Response.json({ found: true, member });
}
