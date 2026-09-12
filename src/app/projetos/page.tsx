import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ProjectVisual } from "@/components/ProjectVisual";
import { ArrowRight } from "@/components/Icons";
import { projects } from "@/data/portfolio";
import { listPublicCmsProjects } from "@/lib/server/business";
import { safeHttpsUrl } from "@/lib/security";

export const metadata:Metadata={title:"Projetos",description:"Cases e produtos digitais desenvolvidos pela NEXORA.",alternates:{canonical:"/projetos"}};
export default async function ProjectsPage(){const cms=await listPublicCmsProjects();return <main id="conteudo"><Header/><section className="inner-page-hero"><div className="shell"><div className="inner-page-copy"><span className="eyebrow">Projetos</span><h1>Produtos reais.<br/>Problemas diferentes.</h1><p>Cases selecionados para mostrar como estratégia, interface e desenvolvimento se combinam em produtos que precisam funcionar no dia a dia.</p></div></div></section><section className="section"><div className="shell"><div className="project-index-grid">{projects.map(project=><article className="project-card" key={project.id}><ProjectVisual project={project}/><div className="project-body"><span className="project-meta">{project.eyebrow}</span><h2>{project.title}</h2><p>{project.description}</p><div className="tag-row">{project.tags.map(t=><span key={t}>{t}</span>)}</div><Link className="case-link" href={`/projetos/${project.slug}`}>Explorar case <ArrowRight size={15}/></Link></div></article>)}{cms.map(project=>{const image=safeHttpsUrl(project.image_url);return <article className="cms-project-card" key={project.id}>{image&&<img src={image} alt={project.title} loading="lazy" referrerPolicy="no-referrer"/>}<div><span className="project-meta">{project.eyebrow||project.category||'Projeto NEXORA'}</span><h2>{project.title}</h2><p>{project.description}</p><div className="tag-row">{project.tags.map(t=><span key={t}>{t}</span>)}</div><Link className="case-link" href={`/projetos/${project.slug}`}>Ver projeto <ArrowRight size={15}/></Link></div></article>})}</div></div></section></main>}
