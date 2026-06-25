import { NextRequest, NextResponse } from "next/server";

const loopsApiKey = process.env.LOOPS_API_KEY;
const welcomeEmailId = process.env.LOOPS_WELCOME_EMAIL_ID;

async function loopsRequest(path: string, body: Record<string, unknown>) {
  const response = await fetch(`https://app.loops.so/api/v1/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${loopsApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      typeof data === "object" && data && "message" in data
        ? String(data.message)
        : "Loops request failed";
    throw new Error(message);
  }

  return data;
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    if (!loopsApiKey) {
      return NextResponse.json(
        { error: "Newsletter signup is not configured yet." },
        { status: 500 },
      );
    }

    await loopsRequest("contacts/create", {
      email,
      properties: {
        source: "website",
        userGroup: "newsletter",
      },
    });

    if (welcomeEmailId) {
      try {
        await loopsRequest("transactional", {
          transactionalId: welcomeEmailId,
          email,
          dataVariables: {},
        });
      } catch (welcomeEmailError) {
        console.warn("Loops welcome email trigger failed:", welcomeEmailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "";

    if (message.includes("already exists")) {
      return NextResponse.json(
        { error: "You're already subscribed!" },
        { status: 409 },
      );
    }

    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
