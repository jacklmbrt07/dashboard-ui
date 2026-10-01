import { google } from '@ai-sdk/google';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";

export const maxDuration = 30;

export async function POST(request: Request) {
  const { messages } = (await request.json()) as { messages: UIMessage[] };

  const result = streamText({
    model: google("gemini-3.8-flash"),
    system:
      "You are a helpful assistant. Use tools when they help answer the user's question.",
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
