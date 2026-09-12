"use client";

import { type ChangeEvent, type FormEvent, useMemo, useState } from "react";
import { ArrowUpRight, Check, Code, WhatsApp } from "@/components/Icons";
import { contact } from "@/data/portfolio";

const projectTypes = ["Site institucional", "Dashboard", "Sistema web", "SaaS", "Automação / integração", "Outro"];
const budgetOptions = ["Ainda não defini", "Até R$ 2.500", "R$ 2.500 a R$ 5.000", "R$ 5.000 a R$ 10.000", "Acima de R$ 10.000"];
const timelineOptions = ["Sem urgência", "Até 30 dias", "1 a 2 meses", "2 a 4 meses", "Quero conversar primeiro"];

export function ContactBriefForm() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", type: projectTypes[0], budget: budgetOptions[0], timeline: timelineOptions[0], details: "" });

  const brief = useMemo(() => {
    const company = form.company.trim() ? `\nEmpresa/projeto: ${form.company.trim()}` : "";
    return `Olá! Vi o portfólio da NEXORA e gostaria de solicitar um orçamento.\n\nNome: ${form.name.trim() || "Não informado"}${company}\nTipo de projeto: ${form.type}\nFaixa de investimento: ${form.budget}\nPrazo: ${form.timeline}\n\nO que preciso:\n${form.details.trim() || "Quero explicar melhor durante a conversa."}`;
  }, [form]);

  const whatsappUrl = `${contact.whatsappBase}?text=${encodeURIComponent(brief)}`;

  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const copyBrief = async () => {
    await navigator.clipboard.writeText(brief);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <form className="brief-form" onSubmit={submit}>
      <div className="brief-form-grid">
        <label>
          <span>Seu nome</span>
          <input required value={form.name} onChange={(event: ChangeEvent<HTMLInputElement>) => update("name", event.target.value)} placeholder="Como podemos te chamar?" />
        </label>
        <label>
          <span>Empresa ou projeto <small>opcional</small></span>
          <input value={form.company} onChange={(event: ChangeEvent<HTMLInputElement>) => update("company", event.target.value)} placeholder="Nome da empresa ou ideia" />
        </label>
        <label>
          <span>Tipo de projeto</span>
          <select value={form.type} onChange={(event: ChangeEvent<HTMLSelectElement>) => update("type", event.target.value)}>
            {projectTypes.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          <span>Faixa de investimento</span>
          <select value={form.budget} onChange={(event: ChangeEvent<HTMLSelectElement>) => update("budget", event.target.value)}>
            {budgetOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          <span>Prazo desejado</span>
          <select value={form.timeline} onChange={(event: ChangeEvent<HTMLSelectElement>) => update("timeline", event.target.value)}>
            {timelineOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label className="brief-details">
          <span>Conte um pouco sobre o projeto</span>
          <textarea value={form.details} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => update("details", event.target.value)} placeholder="Problema que quer resolver, páginas ou recursos necessários, referências, integrações..." rows={7} />
        </label>
      </div>

      <div className="brief-preview">
        <div>
          <span className="brief-preview-icon"><Code /></span>
          <div>
            <strong>Briefing pronto para enviar</strong>
            <p>As informações são montadas no seu navegador. Nada é salvo pela NEXORA antes de você enviar.</p>
          </div>
        </div>
        <pre>{brief}</pre>
      </div>

      <div className="brief-actions">
        <button type="submit" className="button button-whatsapp"><WhatsApp /> Enviar briefing no WhatsApp <ArrowUpRight size={16} /></button>
        <button type="button" className="button button-secondary" onClick={copyBrief}>{copied ? <Check /> : <Code />}{copied ? "Briefing copiado" : "Copiar briefing"}</button>
      </div>
    </form>
  );
}
