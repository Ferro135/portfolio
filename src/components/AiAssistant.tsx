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

const ptPrompts = [
  "Quero criar um sistema",
  "Como funciona o orçamento?",
  "Ver projetos parecidos",
  "Quais serviços vocês fazem?",
];

const enPrompts = [
  "I want to build a system",
  "How does pricing work?",
  "Show me similar projects",
  "What services do you offer?",
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
        ? "Hi! I'm ALUNERI's assistant. I can explain our services, show relevant projects and help structure your idea."
        : "Olá! Sou o assistente da ALUNERI. Posso explicar nossos serviços, mostrar projetos relevantes e ajudar a estruturar sua ideia.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
            ? "Hi! I'm ALUNERI's assistant. I can explain our services, show relevant projects and help structure your idea."
            : "Olá! Sou o assistente da ALUNERI. Posso explicar nossos serviços, mostrar projetos relevantes e ajudar a estruturar sua ideia.",
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

  const acceptNotice = () => {
    setNoticeAccepted(true);
    try {
      sessionStorage.setItem("aluneri_ai_notice", "accepted");
    } catch {}
  };

  const send = async (value?: string) => {
    const content = (value ?? input).trim().slice(0, 1200);
    if (!content || loading) return;

    setError("");
    setInput("");
    setBriefOpen(false);

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
        body: JSON.stringify({
          locale: isEn ? "en" : "pt",
          mode: "chat",
          messages: next
            .filter((message) => message.id !== "welcome")
            .map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        reply?: string;
        error?: string;
      };

      if (!response.ok || !data.ok || !data.reply) {
        throw new Error(data.error || "Assistant unavailable");
      }

      setMessages((current) => [
        ...current,
        {
          id: id(),
          role: "assistant",
          content: data.reply!,
        },
      ]);
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : "Assistant unavailable";
      setError(
        message ||
          (isEn
            ? "The assistant is temporarily unavailable."
            : "O assistente está temporariamente indisponível."),
      );
    } finally {
      setLoading(false);
    }
  };

  const prepareBrief = async () => {
    if (!userMessageCount || briefLoading) return;
    setBriefLoading(true);
    setError("");

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale: isEn ? "en" : "pt",
          mode: "brief",
          messages: conversation,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        reply?: string;
        error?: string;
      };
      if (!response.ok || !data.ok || !data.reply) {
        throw new Error(data.error || "Brief unavailable");
      }
      setBrief(data.reply);
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
                  {isEn ? "AI pre-sales assistant" : "Assistente de pré-atendimento"}
                </small>
              </div>
            </div>
            <button
              type="button"
              className="ai-assistant-close"
              onClick={() => setOpen(false)}
              aria-label={isEn ? "Close assistant" : "Fechar assistente"}
            >
              <Close size={18} />
            </button>
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
                <li>{isEn ? "The assistant only uses public ALUNERI information." : "O assistente usa somente informações públicas da ALUNERI."}</li>
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

              {userMessageCount === 0 && (
                <div className="ai-quick-prompts">
                  {prompts.map((prompt) => (
                    <button type="button" key={prompt} onClick={() => send(prompt)}>
                      {prompt}
                    </button>
                  ))}
                  <Link href={isEn ? "/en/contact" : "/contato"}>
                    {isEn ? "Talk to a person" : "Falar com uma pessoa"} <ArrowRight size={12} />
                  </Link>
                </div>
              )}

              {userMessageCount >= 2 && (
                <div className="ai-brief-cta">
                  <div>
                    <Sparkles size={14} />
                    <span>{isEn ? "Already have enough context?" : "Já temos contexto suficiente?"}</span>
                  </div>
                  <button type="button" onClick={prepareBrief} disabled={briefLoading}>
                    {briefLoading ? (isEn ? "Preparing…" : "Preparando…") : (isEn ? "Turn into a brief" : "Transformar em briefing")}
                  </button>
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
                  placeholder={isEn ? "Ask about a project…" : "Pergunte sobre um projeto…"}
                  aria-label={isEn ? "Message to ALUNERI assistant" : "Mensagem para o assistente ALUNERI"}
                />
                <button type="submit" disabled={!input.trim() || loading} aria-label={isEn ? "Send" : "Enviar"}>
                  <ArrowRight size={17} />
                </button>
              </form>

              <div className="ai-assistant-footer">
                <span>{isEn ? "AI can make mistakes." : "A IA pode cometer erros."}</span>
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
