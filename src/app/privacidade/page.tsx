import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { contact } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a ALUNERI trata dados pessoais em formulários, CRM, analytics e operação do site.",
  alternates: { canonical: "/privacidade", languages: { "pt-BR": "/privacidade", en: "/en/privacy" } },
};

export default function PrivacyPage() {
  return (
    <main id="conteudo">
      <Header />
      <section className="inner-page-hero legal-hero">
        <div className="shell">
          <Link className="case-back" href="/">← Voltar ao portfólio</Link>
          <div className="inner-page-copy">
            <span className="eyebrow">Política de Privacidade</span>
            <h1>Privacidade faz parte da arquitetura.</h1>
            <p>A ALUNERI coleta apenas o que é necessário para responder pedidos, manter a operação e melhorar o produto com consentimento.</p>
            <span className="legal-updated">Última atualização: 14 de setembro de 2026</span>
          </div>
        </div>
      </section>

      <section className="section legal-section">
        <div className="shell legal-content">
          <div className="legal-summary-card">
            <span className="eyebrow">Em poucas palavras</span>
            <h2>Dados comerciais para conversar. Dados técnicos para manter. Analytics só com consentimento.</h2>
            <p>A ALUNERI não vende seus dados e não publica informações enviadas em briefings. As integrações de backend utilizam credenciais privadas que não são entregues ao navegador.</p>
          </div>

          <div className="legal-grid">
            <article><h2>Dados do briefing</h2><p>Nome, contato, empresa, tipo de projeto, recursos, orçamento, prazo e contexto podem ser registrados no CRM para responder, preparar orçamento e acompanhar a oportunidade comercial.</p></article>
            <article><h2>Solicitações de reunião</h2><p>Nome, contato, data, período, fuso horário e observações podem ser registrados para organizar uma conversa. O envio de preferência não significa confirmação automática.</p></article>
            <article><h2>Propostas</h2><p>Informações necessárias para elaborar e disponibilizar propostas comerciais podem ser vinculadas ao lead correspondente no ambiente administrativo.</p></article>
            <article><h2>Analytics opcional</h2><p>Vercel Analytics e Speed Insights somente são carregados depois que você autoriza a categoria de analytics nas preferências de cookies.</p></article><article><h2>Assistente de IA</h2><p>Quando você usa o Assistente ALUNERI, as mensagens da conversa podem ser enviadas ao provedor de IA configurado para gerar a resposta. A ALUNERI não registra essa conversa no CRM por padrão; ela só é transformada em lead quando você revisa o resumo, informa um contato e confirma o envio.</p></article>
            <article><h2>Logs técnicos</h2><p>Falhas do navegador podem registrar mensagem técnica, rota e user agent para diagnóstico. O sistema não foi desenhado para gravar o conteúdo digitado nos formulários nesses logs.</p></article>
            <article><h2>Infraestrutura</h2><p>O site pode utilizar Vercel para hospedagem e telemetria autorizada, Supabase para dados operacionais, serviços de email e provedores de comunicação como WhatsApp.</p></article>
            <article><h2>Retenção</h2><p>Dados comerciais são mantidos enquanto forem úteis para atendimento, histórico operacional, proposta ou projeto. Registros que deixem de ter finalidade podem ser arquivados ou removidos.</p></article>
            <article><h2>Segurança</h2><p>São aplicadas HTTPS, HSTS, CSP, rate limit, controles de acesso administrativo, cookies HttpOnly de sessão, auditoria de dependências e isolamento das credenciais secretas.</p></article>
            <article><h2>Seus controles</h2><p>Você pode rejeitar analytics, alterar cookies e simplesmente fechar o Assistente de IA sem enviar um briefing. Também pode solicitar correção ou exclusão de dados fornecidos à ALUNERI pelos canais de contato disponíveis.</p></article>
            <article><h2>Contato sobre privacidade</h2><p>Use o WhatsApp{contact.email ? <> ou o email <a href={`mailto:${contact.email}`}>{contact.email}</a></> : null} para solicitações relacionadas aos seus dados.</p></article>
          </div>

          <div className="legal-callout">
            <strong>Controle de consentimento</strong>
            <p>Leia também a <Link href="/cookies">Política de Cookies</Link> e os <Link href="/termos">Termos de Uso</Link>.</p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
