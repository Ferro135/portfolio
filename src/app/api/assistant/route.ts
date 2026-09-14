import { NextResponse } from "next/server";
import {
  answerWithAssistant,
  type AssistantMessage,
} from "@/lib/server/assistant";
import { checkRateLimit } from "@/lib/server/rate-limit";

function cleanMessage(value: unknown) {
  return typeof value === "string"
    ? value.replace(/\u0000/g, "").trim().slice(0, 1200)
    : "";
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 24_000) {
      return NextResponse.json(
        { ok: false, error: "Mensagem muito grande." },
        { status: 413 },
      );
    }

    const body = await request.json();
    const mode = body.mode === "brief" ? "brief" : "chat";
    const locale = body.locale === "en" ? "en" : "pt";

    const rawMessages = Array.isArray(body.messages) ? body.messages : [];
    const messages: AssistantMessage[] = rawMessages
      .slice(-10)
      .map((message: unknown) => {
        if (!message || typeof message !== "object") return null;
        const item = message as { role?: unknown; content?: unknown };
        const role = item.role === "assistant" ? "assistant" : "user";
        const content = cleanMessage(item.content);
        return content ? { role, content } : null;
      })
      .filter((message: AssistantMessage | null): message is AssistantMessage => Boolean(message));

    const userMessages = messages.filter((message) => message.role === "user");
    if (!userMessages.length) {
      return NextResponse.json(
        { ok: false, error: locale === "en" ? "Write a message first." : "Escreva uma mensagem primeiro." },
        { status: 400 },
      );
    }

    const limit = await checkRateLimit(
      request,
      mode === "brief" ? "ai_brief" : "ai_chat",
      mode === "brief" ? 6 : 24,
      60 * 60 * 1000,
    );

    if (!limit.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error:
            locale === "en"
              ? "You've reached the assistant limit for now. Please use the contact page or WhatsApp."
              : "Você atingiu o limite do assistente por enquanto. Use a página de contato ou o WhatsApp.",
        },
        { status: 429 },
      );
    }

    const reply = await answerWithAssistant(messages, locale, mode);
    return NextResponse.json({ ok: true, reply });
  } catch (error) {
    console.error("assistant route", error);
    return NextResponse.json(
      {
        ok: false,
        error: "O assistente está temporariamente indisponível.",
      },
      { status: 500 },
    );
  }
}
