import { Webhook } from "svix";
import { headers } from "next/headers";
import prisma from "@/lib/client";

const webhookSecret = process.env.WEBHOOK_SECRET!;

export async function POST(req: Request) {
  // Clerk webhook posílá raw body (text), takže nedělat req.json()
  const payload = await req.text();
  const headerPayload = await headers();

  const svix_id = headerPayload.get("svix-id")!;
  const svix_timestamp = headerPayload.get("svix-timestamp")!;
  const svix_signature = headerPayload.get("svix-signature")!;

  const wh = new Webhook(webhookSecret);

  let evt: any;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("❌ Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }

  // Clerk webhook event data
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`✅ Received Clerk webhook: ${eventType} (ID: ${id})`);
  console.log("Payload:", evt.data);

  try {
    if (eventType === "user.created") {
      await prisma.user.create({
        data: {
          id: evt.data.id,
          username: evt.data.username,
          avatar: evt.data.image_url || "/noAvatar.png",
          cover: "/noCover.png",
        },
      });
      return new Response("User has been created!", { status: 200 });
    }

    if (eventType === "user.updated") {
      await prisma.user.update({
        where: { id: evt.data.id },
        data: {
          username: evt.data.username,
          avatar: evt.data.image_url || "/noAvatar.png",
        },
      });
      return new Response("User has been updated!", { status: 200 });
    }
  } catch (err) {
    console.error("❌ Prisma error:", err);
    return new Response("Database operation failed", { status: 500 });
  }

  return new Response("Webhook received", { status: 200 });
}
