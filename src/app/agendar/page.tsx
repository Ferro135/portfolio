import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { ScheduleForm } from "@/components/ScheduleForm";
import { ArrowLeft } from "@/components/Icons";
export const metadata:Metadata={title:"Agendar conversa",description:"Solicite um horário para conversar com a ALUNERI sobre seu projeto.",alternates:{canonical:"/agendar"}};
export default function SchedulePage(){return <main id="conteudo"><Header/><section className="inner-page-hero"><div className="shell"><Link className="case-back" href="/"><ArrowLeft/> Voltar</Link><div className="inner-page-copy"><span className="eyebrow">Conversa</span><h1>Escolha um horário<br/>que funcione para você.</h1><p>Envie uma preferência de data e período. A solicitação fica registrada e a ALUNERI confirma o encontro pelo contato informado.</p></div></div></section><section className="section"><div className="shell schedule-layout"><aside><span className="eyebrow">Como funciona</span><h2>Sem agenda falsa.</h2><p>Os horários exibidos não fingem disponibilidade em tempo real. Você informa sua preferência e a confirmação acontece depois.</p><ol><li>Escolha data e período</li><li>Informe um contato</li><li>A ALUNERI confirma ou sugere alternativa</li></ol></aside><ScheduleForm/></div></section><SiteFooter/></main>}
