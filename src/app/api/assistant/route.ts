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
    const pagePath =
      typeof body.pagePath === "string"
        ? body.pagePath.trim().slice(0, 240)
        : "/";

    const rawMessages = Array.isArray(body.messages) ? body.messages : [];
    const messages: AssistantMessage[] = rawMessages
      .slice(-14)
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
      mode === "brief" ? "ai_brief_v223" : "ai_chat_v223",
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

    const result = await answerWithAssistant(messages, locale, mode, pagePath);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("assistant route", error);
    const unavailable =
      error instanceof Error && error.message === "AI_PROVIDER_UNAVAILABLE";
    return NextResponse.json(
      {
        ok: false,
        error: unavailable
          ? "A IA avançada não conseguiu responder agora. Tente novamente em alguns segundos."
          : "O assistente está temporariamente indisponível.",
      },
      { status: unavailable ? 502 : 500 },
    );
  }
}
