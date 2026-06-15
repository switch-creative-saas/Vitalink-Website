import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { isValidSignature, body } = await parseBody<{
    _type?: string;
  }>(request, process.env.SANITY_REVALIDATE_SECRET);

  if (!isValidSignature) {
    return Response.json({ message: "Invalid signature" }, { status: 401 });
  }

  if (body?._type) {
    revalidateTag(body._type, "max");
  }

  return Response.json({ revalidated: true, now: Date.now() });
}
