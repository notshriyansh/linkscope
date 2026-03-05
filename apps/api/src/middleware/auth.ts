import { verifyToken } from "@clerk/backend";

export async function verifyClerkToken(req: Request, secretKey: string) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "");

  const payload = await verifyToken(token, {
    secretKey,
  });

  return payload;
}
