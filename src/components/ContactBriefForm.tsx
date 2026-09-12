"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code,
  WhatsApp,
} from "@/components/Icons";
import { contact } from "@/data/portfolio";

const projectTypes = [
  "Site institucional",
  "Dashboard",
  "Sistema web",
  "SaaS & produtos digitais",
  "Sistema administrativo",
  "Automação / integração",
  "Outro",
];

const featureOptions = [
  "Login / contas",
  "Painel administrativo",
  "Banco de dados",
  "Pagamentos",
  "Integração com APIs",
  "Relatórios / dashboards",
  "WhatsApp / notificações",
  "Responsividade mobile",
];

const budgetOptions = [
  "Ainda não defini",
  "Até R$ 2.500",
  "R$ 2.500 a R$ 5.000",
  "R$ 5.000 a R$ 10.000",
  "Acima de R$ 10.000",
];

const timelineOptions = [
  "Sem urgência",
  "Até 30 dias",
  "1 a 2 meses",
  "2 a 4 meses",
  "Quero conversar primeiro",
];

type FormState = {
  name: string;
  company: string;
  type: string;
  features: string[];
  budget: string;
  timeline: string;
  details: string;
};

const steps = [
  { number: "01", title: "Projeto", description: "O que você quer construir?" },
  { number: "02", title: "Recursos", description: "O que precisa fazer parte?" },
  { number: "03", title: "Contexto", description: "Prazo, investimento e problema." },
  { number: "04", title: "Revisão", description: "Confira antes de enviar." },
];

export function ContactBriefForm() {
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    type: projectTypes[0],
    features: [],
    budget: budgetOptions[0],
    timeline: timelineOptions[0],
    details: "",
  });

  useEffect(() => {
    const requestedType = new URLSearchParams(window.location.search).get("tipo");
    if (!requestedType) return;

    const normalized = requestedType.toLocaleLowerCase("pt-BR");
    const direct = projectTypes.find(
      (option) => option.toLocaleLowerCase("pt-BR") === normalized,
    );

    const inferred =
      direct ||
      (normalized.includes("dashboard") ? "Dashboard" : null) ||
      (normalized.includes("site") ? "Site institucional" : null) ||
      (normalized.includes("saas") ? "SaaS & produtos digitais" : null) ||
      (normalized.includes("administr") ? "Sistema administrativo" : null) ||
      (normalized.includes("autom") || normalized.includes("integra")
        ? "Automação / integração"
        : null) ||
      (normalized.includes("painel") || normalized.includes("sistema")
        ? "Sistema web"
        : null);

    if (inferred) {
      setForm((current) => ({ ...current, type: inferred }));
    }
  }, []);

  const brief = useMemo(() => {
    const company = form.company.trim()
      ? `\nEmpresa/projeto: ${form.company.trim()}`
      : "";
    const features = form.features.length
      ? form.features.map((feature) => `- ${feature}`).join("\n")
      : "- Quero definir os recursos durante a conversa";

    return `Olá! Vi o portfólio da NEXORA e gostaria de solicitar um orçamento.

Nome: ${form.name.trim() || "Não informado"}${company}
Tipo de projeto: ${form.type}

Recursos importantes:
${features}

Faixa de investimento: ${form.budget}
Prazo: ${form.timeline}

Contexto do projeto:
${form.details.trim() || "Quero explicar melhor durante a conversa."}`;
  }, [form]);

  const whatsappUrl = `${contact.whatsappBase}?text=${encodeURIComponent(brief)}`;

  const update = <K extends keyof FormState,>(field: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [field]: value }));

  const toggleFeature = (feature: string) => {
    setForm((current) => ({
      ...current,
      features: current.features.includes(feature)
        ? current.features.filter((item) => item !== feature)
        : [...current.features, feature],
    }));
  };

  const canContinue =
    step !== 0 || (form.name.trim().length > 1 && form.type.trim().length > 0);

  const submit = (event: FormEvent) => {
    event.preventDefault();

    if (step < steps.length - 1) {
      if (canContinue) setStep((current) => Math.min(current + 1, steps.length - 1));
      return;
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const copyBrief = async () => {
    await navigator.clipboard.writeText(brief);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <form className="brief-form brief-wizard" onSubmit={submit}>
      <div className="brief-wizard-progress" aria-label={`Etapa ${step + 1} de ${steps.length}`}>
        <div className="brief-wizard-progress-top">
          <span>Briefing em etapas</span>
          <strong>{step + 1}/{steps.length}</strong>
        </div>
        <div className="brief-wizard-track" aria-hidden="true">
          <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
        <div className="brief-wizard-step-labels">
          {steps.map((item, index) => (
            <button
              type="button"
              key={item.number}
              className={index === step ? "active" : index < step ? "done" : ""}
              onClick={() => {
                if (index <= step || canContinue) setStep(index);
              }}
              aria-current={index === step ? "step" : undefined}
            >
              <span>{index < step ? <Check size={13} /> : item.number}</span>
              <div>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="brief-wizard-panel" aria-live="polite">
        {step === 0 && (
          <div className="brief-step-content">
            <div className="brief-step-heading">
              <span className="eyebrow">Etapa 01</span>
              <h3>Vamos começar pelo básico.</h3>
              <p>Nome, contexto e o formato mais próximo do que você imagina hoje.</p>
            </div>

            <div className="brief-form-grid">
              <label>
                <span>Seu nome</span>
                <input
                  required
                  maxLength={80}
                  autoComplete="name"
                  value={form.name}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    update("name", event.target.value)
                  }
                  placeholder="Como podemos te chamar?"
                />
              </label>

              <label>
                <span>Empresa ou projeto <small>opcional</small></span>
                <input
                  maxLength={100}
                  autoComplete="organization"
                  value={form.company}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    update("company", event.target.value)
                  }
                  placeholder="Nome da empresa ou ideia"
                />
              </label>

              <label className="brief-details">
                <span>Tipo de projeto</span>
                <select
                  value={form.type}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    update("type", event.target.value)
                  }
                >
                  {projectTypes.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="brief-step-content">
            <div className="brief-step-heading">
              <span className="eyebrow">Etapa 02</span>
              <h3>Quais recursos parecem importantes?</h3>
              <p>Não precisa ter certeza. Marque apenas o que já faz sentido para a ideia.</p>
            </div>

            <div className="brief-feature-grid">
              {featureOptions.map((feature) => {
                const active = form.features.includes(feature);
                return (
                  <button
                    type="button"
                    key={feature}
                    className={active ? "active" : ""}
                    onClick={() => toggleFeature(feature)}
                    aria-pressed={active}
                  >
                    <span>{active ? <Check size={15} /> : "+"}</span>
                    {feature}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="brief-step-content">
            <div className="brief-step-heading">
              <span className="eyebrow">Etapa 03</span>
              <h3>Agora o contexto.</h3>
              <p>Prazo, investimento e o problema que o produto precisa resolver.</p>
            </div>

            <div className="brief-form-grid">
              <label>
                <span>Faixa de investimento</span>
                <select
                  value={form.budget}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    update("budget", event.target.value)
                  }
                >
                  {budgetOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>

              <label>
                <span>Prazo desejado</span>
                <select
                  value={form.timeline}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    update("timeline", event.target.value)
                  }
                >
                  {timelineOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>

              <label className="brief-details">
                <span>Conte um pouco sobre o projeto</span>
                <textarea
                  maxLength={3000}
                  value={form.details}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    update("details", event.target.value)
                  }
                  placeholder="Problema que quer resolver, usuários, páginas, referências, integrações e qualquer detalhe importante..."
                  rows={8}
                />
                <small>{form.details.length}/3000 caracteres</small>
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="brief-step-content">
            <div className="brief-step-heading">
              <span className="eyebrow">Etapa 04</span>
              <h3>Revise antes de enviar.</h3>
              <p>A NEXORA não salva este briefing. A mensagem é montada no seu navegador.</p>
            </div>

            <div className="brief-preview wizard-preview">
              <div>
                <span className="brief-preview-icon"><Code /></span>
                <div>
                  <strong>Mensagem pronta para WhatsApp</strong>
                  <p>Você pode copiar ou abrir a conversa já preenchida.</p>
                </div>
              </div>
              <pre>{brief}</pre>
            </div>
          </div>
        )}
      </div>

      <div className="brief-wizard-actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={() => setStep((current) => Math.max(0, current - 1))}
          disabled={step === 0}
        >
          <ArrowLeft /> Voltar
        </button>

        <div>
          {step === steps.length - 1 && (
            <button type="button" className="button button-secondary" onClick={copyBrief}>
              {copied ? <Check /> : <Code />}
              {copied ? "Briefing copiado" : "Copiar"}
            </button>
          )}

          <button
            type="submit"
            className={step === steps.length - 1 ? "button button-whatsapp" : "button button-primary"}
            disabled={!canContinue}
          >
            {step === steps.length - 1 ? (
              <>
                <WhatsApp /> Enviar no WhatsApp <ArrowUpRight size={16} />
              </>
            ) : (
              <>
                Continuar <ArrowRight />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
