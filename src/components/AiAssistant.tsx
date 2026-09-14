"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Check,
  Close,
  Sparkles,
  WhatsApp,
} from "@/components/Icons";
import { contact } from "@/data/portfolio";
import {
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type LeadForm = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  privacy: boolean;
  website: string;
};

type AssistantApiResult = {
  ok?: boolean;
  reply?: string;
  suggestions?: string[];
  readyForBrief?: boolean;
  projectType?: string;
  missingInfo?: string[];
  engine?: "openai" | "local";
  model?: string;
  error?: string;
};

const ptPrompts = [
  "Tenho uma ideia e quero organizar o MVP",
  "Quais funções meu sistema realmente precisa?",
  "Qual projeto da ALUNERI mais se parece com a minha ideia?",
  "Quero melhorar um sistema que já existe",
];

const enPrompts = [
  "I have an idea and want to define the MVP",
  "Which features does my system actually need?",
  "Which ALUNERI project is closest to my idea?",
  "I want to improve an existing system",
];

const projectTypes = [
  "Site institucional",
  "Dashboard",
  "Sistema web",
  "SaaS & produtos digitais",
  "Sistema administrativo",
  "Automação / integração",
  "Outro",
];

function id() {
  return Math.random().toString(36).slice(2);
}

function comparableMessage(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isSameMessage(left: string, right: string) {
  const a = comparableMessage(left);
  const b = comparableMessage(right);
  if (!a || !b) return false;
  return a === b || (a.length > 100 && b.length > 100 && (a.includes(b) || b.includes(a)));
}

export function AiAssistant() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const hidden =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/proposta/") ||
    pathname.startsWith("/en/proposal/");

  const [open, setOpen] = useState(false);
  const [noticeAccepted, setNoticeAccepted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: isEn
        ? "Hi! Tell me what you want to build—even if the idea is still rough. I can help define the MVP, suggest features, compare technical approaches and use ALUNERI cases as references."
        : "Olá! Me conte o que você quer construir — mesmo que a ideia ainda esteja incompleta. Eu posso organizar o MVP, sugerir funcionalidades, comparar caminhos técnicos e usar os cases da ALUNERI como referência.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [engine, setEngine] = useState<"unknown" | "openai" | "local">("unknown");
  const [activeModel, setActiveModel] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [readyForBrief, setReadyForBrief] = useState(false);
  const [missingInfo, setMissingInfo] = useState<string[]>([]);
  const [detectedProjectType, setDetectedProjectType] = useState("Sistema web");
  const [briefOpen, setBriefOpen] = useState(false);
  const [brief, setBrief] = useState("");
  const [briefLoading, setBriefLoading] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadForm>({
    name: "",
    email: "",
    phone: "",
    projectType: "Sistema web",
    privacy: false,
    website: "",
  });
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const sendLockRef = useRef(false);
  const activeRequestRef = useRef<AbortController | null>(null);
  const requestSequenceRef = useRef(0);
  const lastSubmitRef = useRef({ content: "", at: 0 });

  const prompts = isEn ? enPrompts : ptPrompts;

  useEffect(() => {
    try {
      setNoticeAccepted(sessionStorage.getItem("aluneri_ai_notice") === "accepted");
    } catch {}

    const openFromHash = () => {
      if (window.location.hash === "#assistant") setOpen(true);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open || briefOpen) return;
    window.setTimeout(() => inputRef.current?.focus(), 120);
  }, [open, briefOpen]);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    setMessages((current) => {
      if (current.length !== 1 || current[0]?.id !== "welcome") return current;
      return [
        {
          id: "welcome",
          role: "assistant",
          content: isEn
            ? "Hi! Tell me what you want to build—even if the idea is still rough. I can help define the MVP, suggest features, compare technical approaches and use ALUNERI cases as references."
            : "Olá! Me conte o que você quer construir — mesmo que a ideia ainda esteja incompleta. Eu posso organizar o MVP, sugerir funcionalidades, comparar caminhos técnicos e usar os cases da ALUNERI como referência.",
        },
      ];
    });
  }, [isEn]);

  const conversation = useMemo(
    () =>
      messages
        .filter((message) => message.id !== "welcome")
        .map(({ role, content }) => ({ role, content })),
    [messages],
  );

  const userMessageCount = conversation.filter(
    (message) => message.role === "user",
  ).length;

  useEffect(() => {
    return () => activeRequestRef.current?.abort();
  }, []);

  const resetConversation = () => {
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;
    sendLockRef.current = false;
    requestSequenceRef.current += 1;
    setLoading(false);
    setError("");
    setSuggestions([]);
    setReadyForBrief(false);
    setMissingInfo([]);
    setDetectedProjectType("Sistema web");
    setBrief("");
    setBriefOpen(false);
    setLeadSent(false);
    setLeadForm({
      name: "",
      email: "",
      phone: "",
      projectType: "Sistema web",
      privacy: false,
      website: "",
    });
    lastSubmitRef.current = { content: "", at: 0 };
    setEngine("unknown");
    setActiveModel("");
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: isEn
          ? "Hi! Tell me what you want to build—even if the idea is still rough. I can help define the MVP, suggest features, compare technical approaches and use ALUNERI cases as references."
          : "Olá! Me conte o que você quer construir — mesmo que a ideia ainda esteja incompleta. Eu posso organizar o MVP, sugerir funcionalidades, comparar caminhos técnicos e usar os cases da ALUNERI como referência.",
      },
    ]);
  };

  const acceptNotice = () => {
    setNoticeAccepted(true);
    try {
      sessionStorage.setItem("aluneri_ai_notice", "accepted");
    } catch {}
  };

  const send = async (value?: string) => {
    const content = (value ?? input).trim().slice(0, 1200);
    if (!content || sendLockRef.current) return;

    const now = Date.now();
    if (
      comparableMessage(lastSubmitRef.current.content) === comparableMessage(content) &&
      now - lastSubmitRef.current.at < 1800
    ) {
      return;
    }

    lastSubmitRef.current = { content, at: now };
    sendLockRef.current = true;
    const sequence = ++requestSequenceRef.current;
    const controller = new AbortController();
    activeRequestRef.current?.abort();
    activeRequestRef.current = controller;

    setError("");
    setInput("");
    setBriefOpen(false);
    setSuggestions([]);

    const userMessage: Message = {
      id: id(),
      role: "user",
      content,
    };
    const next = [...messages, userMessage];
    setMessages(next);
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          locale: isEn ? "en" : "pt",
          mode: "chat",
          pagePath: pathname,
          requestId: `${Date.now()}-${sequence}`,
          messages: next
            .filter((message) => message.id !== "welcome")
            .map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = (await response.json()) as AssistantApiResult;

      if (sequence !== requestSequenceRef.current) return;

      if (!response.ok || !data.ok || !data.reply) {
        throw new Error(data.error || "Assistant unavailable");
      }

      const previousAssistant = [...next]
        .reverse()
        .find((message) => message.role === "assistant" && message.id !== "welcome");

      if (previousAssistant && isSameMessage(previousAssistant.content, data.reply)) {
        setError(
          isEn
            ? "I blocked a duplicated answer. Send one more detail and I’ll continue from there."
            : "Bloqueei uma resposta duplicada. Envie mais um detalhe e eu continuo dali.",
        );
        return;
      }

      setMessages((current) => [
        ...current,
        {
          id: id(),
          role: "assistant",
          content: data.reply!,
        },
      ]);
      setEngine(data.engine === "local" ? "local" : "openai");
      setActiveModel(data.model || "");
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions.slice(0, 3) : []);
      setReadyForBrief(Boolean(data.readyForBrief));
      setMissingInfo(Array.isArray(data.missingInfo) ? data.missingInfo.slice(0, 5) : []);
      if (data.projectType && projectTypes.includes(data.projectType)) {
        setDetectedProjectType(data.projectType);
        setLeadForm((current) => ({
          ...current,
          projectType: data.projectType!,
        }));
      }
    } catch (cause) {
      if (cause instanceof DOMException && cause.name === "AbortError") return;
      const message =
        cause instanceof Error ? cause.message : "Assistant unavailable";
      setError(
        message ||
          (isEn
            ? "The assistant is temporarily unavailable."
            : "O assistente está temporariamente indisponível."),
      );
    } finally {
      if (sequence === requestSequenceRef.current) {
        setLoading(false);
        sendLockRef.current = false;
        if (activeRequestRef.current === controller) activeRequestRef.current = null;
      }
    }
  };

  const prepareBrief = async () => {
    if (!userMessageCount || briefLoading || sendLockRef.current) return;
    setBriefLoading(true);
    setError("");

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale: isEn ? "en" : "pt",
          mode: "brief",
          pagePath: pathname,
          messages: conversation,
        }),
      });
      const data = (await response.json()) as AssistantApiResult;
      if (!response.ok || !data.ok || !data.reply) {
        throw new Error(data.error || "Brief unavailable");
      }
      setBrief(data.reply);
      setEngine(data.engine === "local" ? "local" : "openai");
      setActiveModel(data.model || "");
      if (data.projectType && projectTypes.includes(data.projectType)) {
        setDetectedProjectType(data.projectType);
        setLeadForm((current) => ({ ...current, projectType: data.projectType! }));
      }
      setMissingInfo(Array.isArray(data.missingInfo) ? data.missingInfo.slice(0, 5) : []);
      setBriefOpen(true);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : isEn
            ? "Could not prepare the brief."
            : "Não foi possível preparar o briefing.",
      );
    } finally {
      setBriefLoading(false);
    }
  };

  const submitLead = async (event: FormEvent) => {
    event.preventDefault();
    if (leadSubmitting || !brief) return;

    if (
      leadForm.name.trim().length < 2 ||
      (!leadForm.email.trim() && !leadForm.phone.trim()) ||
      !leadForm.privacy
    ) {
      setError(
        isEn
          ? "Add your name, at least one contact method and accept the privacy policy."
          : "Informe seu nome, pelo menos um contato e aceite a política de privacidade.",
      );
      return;
    }

    setLeadSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          company: "",
          email: leadForm.email,
          phone: leadForm.phone,
          projectType: leadForm.projectType,
          features: [],
          budget: "",
          timeline: "",
          details: brief,
          source: "assistente-aluneri",
          privacyAccepted: leadForm.privacy,
          website: leadForm.website,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Lead submission failed");
      }
      setLeadSent(true);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : isEn
            ? "Could not send the brief."
            : "Não foi possível enviar o briefing.",
      );
    } finally {
      setLeadSubmitting(false);
    }
  };

  const whatsappBrief = `${contact.whatsappBase}?text=${encodeURIComponent(
    `${isEn ? "Hi! I spoke with the ALUNERI assistant and would like to continue." : "Olá! Conversei com o Assistente ALUNERI e gostaria de continuar."}\n\n${brief}`,
  )}`;

  if (hidden) return null;

  return (
    <div className={`ai-assistant ${open ? "is-open" : ""}`}>
      {!open && (
        <button
          type="button"
          className="ai-assistant-launcher"
          onClick={() => setOpen(true)}
          aria-label={isEn ? "Ask ALUNERI" : "Pergunte à ALUNERI"}
        >
          <span className="ai-launcher-icon"><Sparkles size={18} /></span>
          <span>
            <small>{isEn ? "AI assistant" : "Assistente IA"}</small>
            <strong>{isEn ? "Ask ALUNERI" : "Pergunte à ALUNERI"}</strong>
          </span>
        </button>
      )}

      {open && (
        <section
          className="ai-assistant-panel"
          role="dialog"
          aria-modal="false"
          aria-label={isEn ? "ALUNERI AI assistant" : "Assistente de IA da ALUNERI"}
        >
          <header className="ai-assistant-header">
            <div className="ai-assistant-identity">
              <span className="ai-assistant-mark"><Sparkles size={17} /></span>
              <div>
                <strong>ALUNERI</strong>
                <small>
                  <i aria-hidden="true" />
                  {engine === "local"
                    ? (isEn ? "Essential mode" : "Modo essencial")
                    : (isEn ? "AI product consultant" : "Consultor de produto com IA")}
                </small>
              </div>
            </div>
            <div className="ai-assistant-header-actions">
              {userMessageCount > 0 && (
                <button type="button" className="ai-assistant-reset" onClick={resetConversation}>
                  {isEn ? "New" : "Nova"}
                </button>
              )}
              <button
              type="button"
              className="ai-assistant-close"
              onClick={() => setOpen(false)}
              aria-label={isEn ? "Close assistant" : "Fechar assistente"}
            >
              <Close size={18} />
              </button>
            </div>
          </header>

          {!noticeAccepted ? (
            <div className="ai-assistant-notice">
              <span className="eyebrow">{isEn ? "Before we start" : "Antes de começar"}</span>
              <h2>{isEn ? "A focused assistant, not an open chatbot." : "Um assistente focado, não um chatbot aberto."}</h2>
              <p>
                {isEn
                  ? "Your messages may be processed by the configured AI provider to answer you. ALUNERI does not save this chat in the CRM unless you explicitly send it as a project brief."
                  : "Suas mensagens podem ser processadas pelo provedor de IA configurado para gerar a resposta. A ALUNERI não salva esta conversa no CRM, a menos que você envie explicitamente como briefing."}
              </p>
              <ul>
                <li>{isEn ? "Do not send passwords, card data or sensitive documents." : "Não envie senhas, dados de cartão ou documentos sensíveis."}</li>
                <li>{isEn ? "Prices and deadlines require human confirmation." : "Preços e prazos exigem confirmação humana."}</li>
                <li>{isEn ? "Claims about ALUNERI are grounded in public ALUNERI information." : "Afirmações sobre a ALUNERI são baseadas apenas em informações públicas da ALUNERI."}</li>
              </ul>
              <div className="ai-assistant-notice-actions">
                <button type="button" className="button button-primary" onClick={acceptNotice}>
                  {isEn ? "Continue with AI" : "Continuar com IA"} <ArrowRight size={15} />
                </button>
                <Link href={isEn ? "/en/privacy" : "/privacidade"}>
                  {isEn ? "Read privacy policy" : "Ler política de privacidade"}
                </Link>
              </div>
            </div>
          ) : briefOpen ? (
            <div className="ai-brief-view">
              {!leadSent ? (
                <>
                  <div className="ai-brief-heading">
                    <button type="button" onClick={() => setBriefOpen(false)}>← {isEn ? "Chat" : "Conversa"}</button>
                    <span className="eyebrow">{isEn ? "Project brief" : "Briefing do projeto"}</span>
                    <h2>{isEn ? "Ready to send to ALUNERI." : "Pronto para enviar à ALUNERI."}</h2>
                    <p>{isEn ? "Review the AI-generated summary and add a contact method. Nothing is sent until you confirm." : "Revise o resumo gerado pela IA e adicione um contato. Nada é enviado até você confirmar."}</p>
                  </div>

                  <div className="ai-brief-summary">{brief}</div>

                  <form className="ai-lead-form" onSubmit={submitLead}>
                    <input
                      className="ai-honeypot"
                      name="website"
                      value={leadForm.website}
                      onChange={(event) => setLeadForm((current) => ({ ...current, website: event.target.value }))}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    <label>
                      <span>{isEn ? "Your name" : "Seu nome"}</span>
                      <input
                        value={leadForm.name}
                        maxLength={80}
                        onChange={(event) => setLeadForm((current) => ({ ...current, name: event.target.value }))}
                        placeholder={isEn ? "How should we call you?" : "Como podemos te chamar?"}
                      />
                    </label>

                    <div className="ai-lead-grid">
                      <label>
                        <span>Email</span>
                        <input
                          type="email"
                          value={leadForm.email}
                          maxLength={180}
                          onChange={(event) => setLeadForm((current) => ({ ...current, email: event.target.value }))}
                          placeholder="voce@email.com"
                        />
                      </label>
                      <label>
                        <span>WhatsApp</span>
                        <input
                          value={leadForm.phone}
                          maxLength={40}
                          onChange={(event) => setLeadForm((current) => ({ ...current, phone: event.target.value }))}
                          placeholder="+55..."
                        />
                      </label>
                    </div>

                    <label>
                      <span>{isEn ? "Project type" : "Tipo de projeto"}</span>
                      <select
                        value={leadForm.projectType}
                        onChange={(event) => setLeadForm((current) => ({ ...current, projectType: event.target.value }))}
                      >
                        {projectTypes.map((type) => <option key={type}>{type}</option>)}
                      </select>
                    </label>

                    <label className="ai-privacy-check">
                      <input
                        type="checkbox"
                        checked={leadForm.privacy}
                        onChange={(event) => setLeadForm((current) => ({ ...current, privacy: event.target.checked }))}
                      />
                      <span>
                        {isEn ? "I agree that ALUNERI may use this brief and contact data to respond to my request." : "Concordo que a ALUNERI use este briefing e meus dados de contato para responder à solicitação."}{" "}
                        <Link href={isEn ? "/en/privacy" : "/privacidade"}>
                          {isEn ? "Privacy policy" : "Privacidade"}
                        </Link>
                      </span>
                    </label>

                    {error && <p className="ai-assistant-error">{error}</p>}

                    <button className="button button-primary" disabled={leadSubmitting}>
                      {leadSubmitting ? (isEn ? "Sending…" : "Enviando…") : (isEn ? "Send brief to ALUNERI" : "Enviar briefing para ALUNERI")}
                      {!leadSubmitting && <ArrowRight size={15} />}
                    </button>
                  </form>
                </>
              ) : (
                <div className="ai-lead-success">
                  <span className="ai-success-icon"><Check size={24} /></span>
                  <span className="eyebrow">{isEn ? "Brief sent" : "Briefing enviado"}</span>
                  <h2>{isEn ? "The project is now in ALUNERI's CRM." : "Seu projeto já entrou no CRM da ALUNERI."}</h2>
                  <p>{isEn ? "A person can continue the conversation using the contact details you provided." : "Uma pessoa poderá continuar o atendimento usando o contato informado."}</p>
                  <div>
                    <a className="button button-whatsapp" href={whatsappBrief} target="_blank" rel="noreferrer">
                      <WhatsApp size={17} /> {isEn ? "Continue on WhatsApp" : "Continuar no WhatsApp"}
                    </a>
                    <button type="button" className="button button-secondary" onClick={() => { setLeadSent(false); setBriefOpen(false); }}>
                      {isEn ? "Back to chat" : "Voltar à conversa"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="ai-assistant-messages" ref={listRef}>
                {messages.map((message) => (
                  <div key={message.id} className={`ai-message ai-message-${message.role}`}>
                    {message.role === "assistant" && <span className="ai-message-avatar"><Sparkles size={12} /></span>}
                    <div>{message.content}</div>
                  </div>
                ))}

                {loading && (
                  <div className="ai-message ai-message-assistant">
                    <span className="ai-message-avatar"><Sparkles size={12} /></span>
                    <div className="ai-typing" aria-label={isEn ? "Assistant is typing" : "Assistente está escrevendo"}>
                      <i /><i /><i />
                    </div>
                  </div>
                )}

                {error && !briefOpen && <p className="ai-assistant-error">{error}</p>}
              </div>

              <div className="ai-quick-prompts">
                {(suggestions.length ? suggestions : prompts).map((prompt) => (
                  <button type="button" key={prompt} onClick={() => void send(prompt)} disabled={loading}>
                    {prompt}
                  </button>
                ))}
                {userMessageCount === 0 && (
                  <Link href={isEn ? "/en/contact" : "/contato"}>
                    {isEn ? "Talk to a person" : "Falar com uma pessoa"} <ArrowRight size={12} />
                  </Link>
                )}
              </div>

              {userMessageCount >= 1 && (
                <div className={`ai-brief-cta ${readyForBrief ? "is-ready" : ""}`}>
                  <div>
                    <Sparkles size={14} />
                    <span>
                      {readyForBrief
                        ? (isEn ? `I already understand this as: ${detectedProjectType}` : `Já entendi seu projeto como: ${detectedProjectType}`)
                        : (isEn ? "I'm still refining the project context." : "Ainda estou refinando o contexto do projeto.")}
                    </span>
                  </div>
                  <button type="button" onClick={prepareBrief} disabled={briefLoading || !userMessageCount}>
                    {briefLoading
                      ? (isEn ? "Preparing…" : "Preparando…")
                      : (isEn ? "Create brief" : "Gerar briefing")}
                  </button>
                </div>
              )}

              {missingInfo.length > 0 && !readyForBrief && (
                <div className="ai-missing-context">
                  <strong>{isEn ? "Useful details to clarify" : "Detalhes que ajudariam"}</strong>
                  <span>{missingInfo.slice(0, 2).join(" • ")}</span>
                </div>
              )}

              <form
                className="ai-assistant-composer"
                onSubmit={(event) => {
                  event.preventDefault();
                  void send();
                }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  maxLength={1200}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={isEn ? "Describe the idea or ask a question…" : "Descreva a ideia ou faça uma pergunta…"}
                  aria-label={isEn ? "Message to ALUNERI assistant" : "Mensagem para o assistente ALUNERI"}
                />
                <button type="submit" disabled={!input.trim() || loading} aria-label={isEn ? "Send" : "Enviar"}>
                  <ArrowRight size={17} />
                </button>
              </form>

              <div className="ai-assistant-footer">
                <span>
                  {engine === "local"
                    ? (isEn ? "Essential mode · limited answers" : "Modo essencial · respostas limitadas")
                    : activeModel
                      ? `${activeModel} · ${isEn ? "AI can make mistakes" : "a IA pode cometer erros"}`
                      : (isEn ? "AI can make mistakes." : "A IA pode cometer erros.")}
                </span>
                <Link href={isEn ? "/en/privacy" : "/privacidade"}>
                  {isEn ? "Privacy" : "Privacidade"}
                </Link>
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}
