const crypto = require("crypto");
require("dotenv").config();

// Function to generate SVIX signature
function generateSvixSignature(secret, timestamp, payload) {
  const toSign = `${timestamp}.${payload}`;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(toSign)
    .digest("hex");
  return `v1,${signature}`;
}

async function testWebhook() {
  const webhookSecret = process.env.WEBHOOK_SECRET;
  const timestamp = new Date().toISOString();
  const payload = {
    type: "user.created",
    data: {
      id: "test_user_123",
      username: "testuser",
      email_addresses: [
        {
          email: "test@example.com",
        },
      ],
      image_url: null,
    },
  };

  const stringifiedPayload = JSON.stringify(payload);
  const signature = generateSvixSignature(
    webhookSecret,
    timestamp,
    stringifiedPayload
  );

  try {
    const response = await fetch("http://localhost:3000/api/webhooks/clerk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "svix-id": "test-123",
        "svix-timestamp": timestamp,
        "svix-signature": signature,
      },
      body: stringifiedPayload,
    });

    const responseText = await response.text();
    console.log("Response:", response.status, responseText);
  } catch (error) {
    console.error("Error:", error);
  }
}

testWebhook();
