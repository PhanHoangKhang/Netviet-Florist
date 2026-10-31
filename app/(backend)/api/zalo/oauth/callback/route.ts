import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  const oaId = searchParams.get("oa_id");
  const state = searchParams.get("state");

  if (!code || !oaId) {
    return NextResponse.json(
      { message: "Missing authorization code or OA ID" },
      { status: 400 }
    );
  }

  // TODO:
  // 1. Validate state against the server-side stored state.
  // 2. Exchange authorization code for OA access token.
  // 3. Securely store access token and refresh token.

  return NextResponse.json({
    message: "Zalo OAuth callback received",
    oaId,
    stateReceived: Boolean(state),
  });
}